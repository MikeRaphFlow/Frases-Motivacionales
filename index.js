import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://thispersondoesnotexist.com/";
const API_URL_1 = "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", async (req, res) => {
    try {
      const result = await axios.get(API_URL_1);
      const response = await axios.get(API_URL);
      res.render("index.ejs", { foto: response.request.res.responseUrl, frase: result.data.quoteText , autor: result.data.quoteAuthor });
    } catch (error) {
      res.status(404).send(error.message)
    }
});

app.post("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const result = await axios.get(API_URL_1);
    res.render("index.ejs", { foto: response.request.res.responseUrl, frase: result.data.quoteText , autor: result.data.quoteAuthor });
  } catch (error) {
    res.status(404).send(error.message)
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





// app.get("/", async (req, res) => {
//   try {
//     // Hacer una solicitud a la API de Lorem Picsum para obtener una imagen aleatoria
//     const response = await axios.get("https://picsum.photos/200/300");
    
//     // Renderizar la página EJS y pasar la URL de la imagen como dato
//     res.render("index.ejs", { imageUrl: response.request.res.responseUrl });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.listen(port, () => {
//   console.log(`Servidor en funcionamiento en http://localhost:${port}`);
// });
