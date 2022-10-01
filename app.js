const express = require("express");
const app = express();
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");

const mysql = require("mysql2");
const pool = mysql.createPool({
    host: "us-cdbr-east-06.cleardb.net",
    port: 3306,
    user: "ba078f4cff050a",
    password: "2ac694ea",
    database: "heroku_8afbad23634f9c6"
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

function renderPage(htmlFileName) {
    let template = new JSDOM(fs.readFileSync(__dirname + "/view/template.html", "utf8"));
    template.window.document.getElementById("content").innerHTML = fs.readFileSync(`${__dirname}/view/${htmlFileName}.html`, "utf8");
    return template.serialize();
}

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(renderPage("main"));
});

app.get("/bookings", (req, res) => {
    res.send(renderPage("bookings"));
});

app.get("/room", (req, res) => {
    res.send(renderPage("room"));
});

app.listen(PORT, () => {
    console.log(`App up at port ${PORT}`);
});
