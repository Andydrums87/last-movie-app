require("dotenv").config()

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');



const app = express();
const key = process.env.MOVIE_API_KEY;
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.post("/", async (req, res) => {
 try {
    const movieTitle = req.body.search
    const response = await axios.get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${key}`);
    const result = response.data
    console.log(result)
    res.render("index.ejs", {data: result})

} catch (error) {
    res.status(404);
    console.log(error)
 }    
  });

  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
