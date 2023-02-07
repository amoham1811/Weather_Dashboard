// Initial array of movies
var cities = [];
var cityLatitude = 0.0;
var cityLongitude = 0.0;
var weatherToday = $('#today');
var weatherForcast = $('#forecast');
// var heading = $('<h>');
// heading.text('5-Day Forecast: ');
// weatherForcast.append(heading);


if (localStorage.getItem("Cities") != null){
    cities = JSON.parse(localStorage.getItem("Cities"));
}
// Function for displaying city buttons
function renderButtons() {
    $("#history").text('')
    
    if (cities != null){
        for (i=0;i<cities.length;i++){
            var cityButton = $("<button>");
            cityButton.addClass('cityBtn');
            cityButton.text(cities[i]);
            $("#history").append(cityButton);
        }
    }
}
//Function to return coordinates of a city
function cityCoordinates(searchCity){
    // API key
    var APIKey = "5d58e212fe391910382498dca0cb2836";
    // Build the URL to query the database for latitude and longitude information
    var queryURL = "https://api.openweathermap.org/geo/1.0/direct?q="+searchCity+"&limit=5&appid="+APIKey

    // Create an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

    // Create CODE HERE to log the resulting object
    console.log(response);
    cityLatitude = response[0].lat;
    cityLongitude = response[0].lon;
    fiveDayForcast(cityLatitude,cityLongitude);

    });
}

//Function to return 5 day forcast for the selected city
function fiveDayForcast(lat,long){
    // API key
    var APIKey = "5d58e212fe391910382498dca0cb2836";
    
    // Build the URL to query the database for 5 day weather forcast
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+long+"&appid="+APIKey
    // Create an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

    console.log(response);
    
    //todays weather
    var wdate = new Date(response.list[0].dt_txt);
    weatherdate = wdate.getDay().toString()+"/"+wdate.getMonth().toString()+"/"+wdate.getFullYear().toString();
    
    var headingDiv = $('<div>');
    var firstDiv = $('<div>');
    var secondDiv = $('<div>');
    var thirdDiv = $('<div>');
    var iconImg = $('<img>');

    // iconImg.attr('alt=','weather icon');
    headingDiv.text(response.city.name+" ( "+weatherdate+" )");
    headingDiv.addClass("today-heading");
    
    iconImg.attr("src","../images/"+response.list[0].weather[0].icon+".png");
    
    headingDiv.append(iconImg);
    firstDiv.text("Temp: "+response.list[0].main.temp+"'K");
    secondDiv.text("Wind: "+response.list[0].wind.speed);
    thirdDiv.text("Humidity: "+response.list[0].main.humidity);
    
    weatherToday.append(headingDiv);
    weatherToday.append(firstDiv);
    weatherToday.append(secondDiv);
    weatherToday.append(thirdDiv);
    
    //weather forcast data
    count = 5
    for (i=0;i < 5;i++){
        var wdate = new Date(response.list[count].dt_txt);
        weatherdate = wdate.getDay().toString()+"/"+wdate.getMonth().toString()+"/"+wdate.getFullYear().toString();
        
        var headDiv= $('<div>');
        headDiv.addClass("col-sm fore-cast");
        var headingDiv = $('<div>');
        var Image = $('<img>');
        var firstDiv = $('<div>');
        var secondDiv = $('<div>');
        var thirdDiv = $('<div>');

        Image.attr("src","../images/"+response.list[count].weather[0].icon+".png");
        headingDiv.text(weatherdate);
        firstDiv.text("Temp: "+response.list[count].main.temp+"'K");
        secondDiv.text("Wind: "+response.list[count].wind.speed);
        thirdDiv.text("Humidity: "+response.list[count].main.humidity);
        
        headDiv.append(headingDiv);
        headDiv.append(Image);
        headDiv.append(firstDiv);
        headDiv.append(secondDiv);
        headDiv.append(thirdDiv);
        weatherForcast.append(headDiv);
        count += 8;
    }
    
    });
}
// Click Event Listners - This function handles events where one search button is clicked
$("#search-button").on("click", function(event) {
    event.preventDefault();
    weatherToday.children().remove();
    weatherForcast.children().remove();

    var CityName = document.getElementById("search-input").value;
    var index = cities.indexOf(CityName);
    if (index == -1 && CityName != ''){
        cities.push(CityName);
        cityCoordinates(CityName);
       
    }    
    renderButtons();
    
   
    //Update local storage with the new button 
    localStorage.setItem("Cities", JSON.stringify(cities));    
   });

// This function handles events where delete button is clicked
$("#delete-button").on("click", function(event) {
    //event.preventDefault();
    var CityName = document.getElementById("search-input").value;
    var index = cities.indexOf(CityName);
    if (index != -1){
        cities.splice(index, 1);
    }

    if (CityName != null) {
        renderButtons();
    }
    //Update local storage with the new button 
    localStorage.setItem("Cities", JSON.stringify(cities)); 
   });

 $("#history").on('click', '.cityBtn', function (event) {
    event.preventDefault();
    weatherToday.children().remove();
    weatherForcast.children().remove();
    var cityName = event.target.innerHTML;
    cityCoordinates(cityName);

 });
 
//Initial rendering of the buttons
renderButtons();

// store updated planner
//localStorage.setItem("Cities", JSON.stringify(Cities));