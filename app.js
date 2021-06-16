const express = require('express');
const https = require('https');
const bodyParser = require('body-Parser');

const app = express();
app.use(bodyParser.urlencoded({extented:true}));

app.get("/", function(req,res){

  res.sendFile(__dirname + "/index.html");


})
app.post("/", function(req, res){
  // console.log(req.body.cityName);
  // console.log("Post request recieved");

  const query = req.body.cityName;
  const apiKey = "3afacaabc55fedc4eb994cb8a1813867";
  const units = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units="+ units;

  https.get(url,function(response){
  console.log(response);
  console.log(response.statusCode);

  response.on("data", function(data){
    console.log(data);//on method is use to see or collect data from api.
    // This Will Provide Data HexaDecimal form.
    // to change into java object form we use this.
    const weatherData = JSON.parse(data);
    console.log(weatherData);
    const temp = weatherData.main.temp;
    console.log(temp);
    const weatherDiscription = weatherData.weather[0].description;
    console.log(weatherDiscription);
    const icon = weatherData.weather[0].icon;
    console.log(icon);
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    res.write("<p>The temperature is currently " + weatherDiscription + ".</p>");
    res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
    res.write("<img src=" + imageURL + ">")
    res.send();
  // we can only one res.send we can have multiple res.write.
  // we must have res.send at last.
    // const object = {
    //   Name : "Shivam Mandloi",
    //   Food : "Pizza"
    // }
    // console.log(JSON.stringify(object));
  })
  })
})









app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
