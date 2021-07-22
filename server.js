//Dependencias
const express = require("express");
const morgan = require("morgan");
var path = require("path");

// Creación de servidor
const app = express();
var port = process.env.PORT || 3000;

// Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Morgan
app.use(morgan("dev"));

// Data
var tables = [];
var waitlist = [];

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
	return res.json(tables);
});

app.get("/api/waitlist", (req, res) => {
	return res.json(waitlist);
});

app.post("/api/tables", (req, res) => {
	var newReservation = req.body;

	// Validaciones
	if (tables.length < 5) {
		tables.push(newReservation);
		res.send(true);
	} else {
		waitlist.push(newReservation);
		res.send(false);
	}
});

// Listener
app.listen(port, () => {
	console.log("Server running on port: " + port);
});
