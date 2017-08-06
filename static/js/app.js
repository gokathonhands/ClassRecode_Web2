var backgroundColor = [
    "#f08676",
    "#9d86e0",
    "#ebc469",
    "#75ca86",
    "#a6c96f",
    "#d397ed",
    "#78a5e8",
    "#fbab66",
    "#bf7000",
    "#1d447c",
    "#216900",
    "#d5b400"
];
var courseName = [];
$(".timetable-item").on("click", function(){
    
    console.log(1);
    
    var $this = $(this);
    
    console.log($this);
    
    $(".main-controls > h1").html(
        $this.data("courseName") + "<br>" +
        $this.data("dayKo") + "<br>" + 
        $this.data("startTime") + " ~ " +
        $this.data("endTime") + "교시"
    );
    $(".main-controls").show();
    $("audio").show();
    /*
    $.ajax({
        type: 'GET',
        url: 'http://52.198.142.127/api/course/',
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).done(function(){
        
    })
    */
})

/**
 * log-in
 */
$(".log-in-btn").on("click", function(){
    var username = $("#username").val();
    var firstName = $("#first_name").val();
    $.ajax({
        type: 'POST',
        url: 'http://52.198.142.127/api/users/',
        data: {
            username: username,
            first_name: firstName
        }
    }).done(function(data) {
        var token = "Token " + data.token; 
        localStorage.setItem("token", token);
        $(".user").removeClass("not-user");
        $(".user").addClass("is-user");
        $(".form-group").addClass("not-user");
        $(".username").text(username);
        $.ajax({
            type: 'GET',
            url: 'http://52.198.142.127/api/course/',
            headers: {
                Authorization: localStorage.getItem("token")
            },
            processData: false,
            contentType: false
        }).done(function(data) {
            var timetableItem = "";
            var day = "";
            var dayKo = "";
            for(var i = 0; i < data.length; i++) {
                timetableItem = document.createElement("button");
                data[i].day;
                switch(data[i].day - 1) {
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
                
                if (courseName.indexOf(data[i].courseName) < 0) {
                    courseName.push(data[i].courseName);
                }
            }
/**
 * table item background color
 */
            for (var j = 0; j < courseName.length; j++) {
                for (var i = 0; i < $(".timetable-item").length; i++) {
                    if ($(".timetable-item")[i].dataset.courseName === courseName[j]) {
                        $(".timetable-item")[i].style.backgroundColor = backgroundColor[j];
                    }
                }
            }
        })
    })
})
