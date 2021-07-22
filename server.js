//Dependencias
const express = require("express");
const morgan = require("morgan");
let path = require("path");

// Creación de servidor
const app = express();
let port = process.env.PORT || 3000;

// Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Morgan
app.use(morgan("dev"));

// Data
let reservations = [];
let waitingList = [];

// Rutas
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", (req, res) => {
	res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", (req, res) => {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

// APIs
app.get("/api/tables", (req, res) => {
	return res.json(reservations);
});

app.get("/api/waitlist", (req, res) => {
	return res.json(waitingList);
});

// Listener
app.listen(port, () => {
	console.log("Server running on port: " + port);
});
