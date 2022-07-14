let currentHour = moment().hour();
let dayOfWeek = moment().format('dddd');
let currentDay = moment().format('MMMM Do YYYY');


$("#currentDay").text(`${dayOfWeek}, ${currentDay}`)

//Check if tasks exists as local storage object, if not create, then set background color and load data from local storage
let loadTasks = function() {
    

    if (!localStorage.getItem("tasks")) {
        tasks = {
            9: "",
            10: "",
            11: "",
            12: "",
            13: "",
            14: "",
            15: "",
            16: "",
            17: "",
            18: "",
            19: "",
        } 
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
            tasks = JSON.parse(localStorage.getItem("tasks")); 
        }

    for (i=9; i < 19; i++) {
        let hourBlock = $("#" + i)
        if (i < currentHour) {
            hourBlock.addClass("past")
        } else if ( i > currentHour) {
            hourBlock.addClass("present")
        } else if (i = currentHour) {
            hourBlock.addClass("future")
        }
        hourBlock.text(tasks[i])
    }
}

//Once focus is lost on the textarea it will automatically update the object
$(".task-input").on("blur", function(){
    let id = $(this).attr('id')
    let text = $(this).val().trim()

    tasks[id] = text

    })

//when save button is clicked any changes to the object will be updated in local storage
$(".save-button").on("click", function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks()
})

loadTasks()
