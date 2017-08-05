// set up basic variables for app

var record = document.querySelector('.record');
var stop = document.querySelector('.stop');
var soundClips = document.getElementsByClassName(".sound-clips");
console.log(soundClips);

// disable stop button while not recording

stop.disabled = true;

// visualiser setup - create web audio api context and canvas

var audioCtx = new (window.AudioContext || webkitAudioContext)();

//main block for doing the audio recording

if (navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');

    var constraints = { audio: true };
    var chunks = [];

    var clipDown = document.createElement('a');
    
    var onSuccess = function(stream) {
        var mediaRecorder = new MediaRecorder(stream);
/**
 *  record click
 */
        record.onclick = function() {
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            console.log("recorder started");
            record.style.background = "red";
            
            stop.disabled = false;
            record.disabled = true;
        }
/**
 *  stop click
 */
        stop.onclick = function() {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            console.log("recorder stopped");
            record.style.background = "";
            record.style.color = "";

            stop.disabled = true;
            record.disabled = false;
        }
/**
 *  record stop
 */
        mediaRecorder.onstop = function(e) {
            console.log("data available after MediaRecorder.stop() called.");

            var clipName = prompt('Enter a name for your sound clip?','My unnamed clip');
            console.log(clipName);
            var clipContainer = document.createElement('article');
            var audio = document.createElement('audio');
            var deleteButton = document.createElement('button');

            clipContainer.classList.add('clip');
            audio.setAttribute('controls', '');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';

            if(clipName === null) {
                clipDown.textContent = 'My unnamed clip';
            } else {
                clipDown.textContent = clipName;
            }
          
            clipContainer.appendChild(audio);
            clipContainer.appendChild(clipDown);
            clipContainer.appendChild(deleteButton);
            soundClips.appendChild(clipContainer);

            audio.controls = true;
            var blob = new Blob(chunks, { 'type' : 'audio/x-wav' });
            chunks = [];
            var audioURL = window.URL.createObjectURL(blob);
            audio.src = audioURL;
            clipDown.href = audioURL;
            clipDown.download = "asdf.wav";
            console.log("recorder stopped");

            var fd = new FormData();
            fd.append('wav', blob);

            console.log("waveData: " + blob);
          
            $.ajax({
                type: 'POST',
                url: '/a',
                data: fd,
                processData: false,
                contentType: false
            }).done(function(data) {
                console.log(data);
            });
          

            deleteButton.onclick = function(e) {
                evtTgt = e.target;
                evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
            }

            clipLabel.onclick = function() {
                var existingName = clipLabel.textContent;
                var newClipName = prompt('Enter a new name for your sound clip?');
                if(newClipName === null) {
                    clipLabel.textContent = existingName;
                } else {
                    clipLabel.textContent = newClipName;
                }
            }
        }

        mediaRecorder.ondataavailable = function(e) {
            chunks.push(e.data);
        }
    }

    var onError = function(err) {
        console.log('The following error occured: ' + err);
    }

    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);

} else {
    console.log('getUserMedia not supported on your browser!');
}

/**
 *  get random color
 */
function getRandomColor() {
  var hex = Math.floor(Math.random() * 0xFFFFFF);
  return "#" + ("000000" + hex.toString(16)).substr(-6);
}

$(document).ready(function() {
    /*
    $.ajax({
        type: 'GET',
        url: 'http://52.198.142.127/api/course/',
        processData: false,
        contentType: false
    }).done(function(data) {
        console.log(data);
        for(let i = 0; i < data.length; i++) {
            timetableItem = document.createElement("div");
            var day = ""
            data[i].day;
            switch(data[i].day) {
                case 0:
                    day = "mon";
                    break;
                case 1:
                    day = "tue";
                    break;
                case 2:
                    day = "wed";
                    break;
                case 3:
                    day = "thu";
                    break;
                case 4:
                    day = "fri";
                    break;
            }
            timetableItem.addClass(day + "-" + data[i].startTime + "-s");
            timetableItem.addClass(day + "-" + data[i].endTime + "-e");
        }
    });
    */
    var timetableItem = "";
    let data = [
        {
            "id": 1,
            "year": 17,
            "term": "2R",
            "courseCode": "KECE109",
            "courseName": "공학수학",
            "day": 0,
            "startTime": 1,
            "endTime": 1,
            "buildingName": "하나스퀘어",
            "roomType": "강의실",
            "roomName": "B101",
            "profName": "허능호",
            "created": "2017-08-05T11:29:58.541099Z",
            "user": 1
        },
        {
            "id": 2,
            "year": 17,
            "term": "2R",
            "courseCode": "KECE109",
            "courseName": "공학수학",
            "day": 2,
            "startTime": 1,
            "endTime": 1,
            "buildingName": "하나스퀘어",
            "roomType": "강의실",
            "roomName": "B101",
            "profName": "허능호",
            "created": "2017-08-05T12:30:58.102487Z",
            "user": 1
        },
        {
            "id": 3,
            "year": 17,
            "term": "2R",
            "courseCode": "BUSS205",
            "courseName": "마케팅원론",
            "day": 0,
            "startTime": 3,
            "endTime": 4,
            "buildingName": "L-P",
            "roomType": "강의실",
            "roomName": "309",
            "profName": "이두희",
            "created": "2017-08-05T12:33:04.266532Z",
            "user": 1
        }
    ]
    console.log(data);
    for(let i = 0; i < data.length; i++) {
        timetableItem = document.createElement("button");
        var day = "";
        var dayKo = "";
        data[i].day;
        switch(data[i].day) {
            case 0:
                day = "mon";
                dayKo = "월요일";
                break;
            case 1:
                day = "tue";
                dayKo = "화요일";
                break;
            case 2:
                day = "wed";
                dayKo = "수요일";
                break;
            case 3:
                day = "thu";
                dayKo = "목요일";
                break;
            case 4:
                day = "fri";
                dayKo = "금요일";
                break;
        }
        timetableItem.className += day + "-" + data[i].startTime + "-s ";
        timetableItem.className += day + "-" + data[i].endTime + "-e ";
        timetableItem.className += "timetable-item ";
        
        timetableItem.style.background = getRandomColor();
        
        timetableItem.dataset.id = data[i].id;
        timetableItem.dataset.courseName = data[i].courseName;
        timetableItem.dataset.dayKo = dayKo;
        timetableItem.dataset.startTime = data[i].startTime;
        timetableItem.dataset.endTime = data[i].endTime;
        var courseNameElement = document.createElement("p");
        var courseNametextNode = document.createTextNode(data[i].courseName);
        courseNameElement.appendChild(courseNametextNode);
        
        var profNameElement = document.createElement("p");
        var profNameTextNode = document.createTextNode(data[i].profName);
        profNameElement.appendChild(profNameTextNode);
        
        timetableItem.appendChild(courseNameElement);
        timetableItem.appendChild(profNameElement);
        $('.tbl-wrap').append(timetableItem);
    }
    $(".timetable-item").on("click", function(){
        var $this = $(this);
        $(".main-controls > h1").html(
            $this.data("courseName") + "<br>" +
            $this.data("dayKo") + "<br>" + 
            $this.data("startTime") + " ~ " +
            $this.data("endTime") + "교시"
        )
        
        
        
        $(".main-controls").show();
    })
});