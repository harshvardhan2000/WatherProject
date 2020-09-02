const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));

app.post("/", function(req, res){
  const value = req.body.cityname;
  const appid = "f009b7a3c1eff91a899802f7f34f9765";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+value+"&appid="+appid+"&units="+unit+""
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherdata = JSON.parse(data)
      const des = weatherdata.weather[0].description
      const temp = weatherdata.main.temp
      const icon = weatherdata.weather[0].icon
      const imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>The temperature in " +  value  +  " is " + temp + " degree celcius<h1>");
      res.write("<img src =" + imageurl + ">");
      res.send();
    })
  });
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

});

// app.get("/", function(req, res){
//   const query = "London,uk";
//
// });








app.listen("3000", function(req, res){
  console.log("server started at port 3000");
});
