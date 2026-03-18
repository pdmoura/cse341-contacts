const express = require("express");
const dns = require("dns");

if (process.env.NODE_ENV !== "production") {
	dns.setServers(["8.8.8.8", "8.8.4.4"]);
}
const app = express();
const mongodb = require("./db/connect");
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", require("./routes"));

mongodb.initDb((err) => {
	if (err) {
		console.error("Database connection failed:", err);
		process.exit(1);
	} else {
		app.listen(port, () => {
			console.log(`Connected to DB and listening on ${port}`);
		});
	}
});
