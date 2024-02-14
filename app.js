const express = require("express");

const app = express();

app.listen(4000, (err) =>
  err ? console.error(err) : console.log("Server working...")
);

app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/js"));
app.use(express.static(__dirname + "/handler"));
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/offline"));

app.get("/names", async (req, res) => {
  try {
    const data = ["Dima", "Vlad", "Slava"];

    return res.status(200).json({ names: data });
  } catch (err) {
    console.error(err);

    return res.status(500).json({ message: "Что-то пошло не так!" });
  }
});

app.get("/", async (req, res) => {
  try {
    await res.sendFile(__dirname + "/index.html");
  } catch (err) {
    console.error(err);
  }
});
