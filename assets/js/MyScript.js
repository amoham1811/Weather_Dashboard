// Initial array of movies
var cities = [];
if (localStorage.getItem("Cities") != null){
    cities = JSON.parse(localStorage.getItem("Cities"));
}
// Function for displaying city buttons
function renderButtons() {
    $("#history").text('')
    
    if (cities != null){
        for (i=0;i<cities.length;i++){
            var cityButton = $("<button>");
            cityButton.text(cities[i]);
            $("#history").append(cityButton);
        }
    }
}
// This function handles events where one button is clicked
$("#search-button").on("click", function(event) {
    //event.preventDefault();
    alert('The search click works!');
    var CityName = document.getElementById("search-input").value;
    var index = cities.indexOf(CityName);
    if (index == -1){
        cities.push(CityName);
    }
    renderButtons();
    //Update local storage with the new button 
    localStorage.setItem("Cities", JSON.stringify(cities));    
   });

// This function handles events where one button is clicked
$("#delete-button").on("click", function(event) {
    //event.preventDefault();
    alert('I am in delete click works!');
    var CityName = document.getElementById("search-input").value;
    var index = cities.indexOf(CityName);
    if (index != -1){
        cities.splice(index, 1);
    }
    renderButtons();
    //Update local storage with the new button 
    localStorage.setItem("Cities", JSON.stringify(cities));    
   });

//Initial rendering of the buttons
renderButtons();
 
// store updated planner
//localStorage.setItem("Cities", JSON.stringify(Cities));