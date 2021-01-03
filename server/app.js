const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

const infoRouter = require('./routes/info');

const PORT = process.env.PORT || 8080;
const DB_URI = process.env.DB_URI || "mongodb://localhost";

const dbOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: "frast",
    w: "majority",
};

mongoose.connect( DB_URI, dbOptions ).catch(err => {
    console.log("Couldn't connect to remote DB. Trying to connect to localhost...");

    mongoose.connect("mongodb://localhost", dbOptions)
                .catch(
                    err => console.error(err)
                )
})

mongoose.connection.on( "error", (err) => {
    console.error(`[${err.code}] There was an error in DB connection: mongo DB couldn't be reached`);
})

mongoose.connection.once( "open", () => {
    console.log(`Connected to the database: ${mongoose.connection.db.databaseName}`);
})

app.use(morgan("dev")); // log requests
app.set('trust proxy', 1);  // Trust the nth hop from the front-facing proxy server as the client.
app.use(express.urlencoded({extended: false})); // use the querystring library

app.use(express.json());

// ROUTES START
app.use("/info", infoRouter);
// ROUTES END

//404 and Error handlers
app.use((req, res, next) => {
	//catch any request to endpoint not available
	next({ status: 404, message: `Route ${req.baseUrl} not found` }, req, res)
});

//error handler
app.use((err, req, res, next) => {
	res
		.status(err.status || 500)
		.send(err.message || `Request couldn't be completed`);
});

	// no need to explicitly mount on http
module.exports = app.listen(() => {
	console.info(`Server listening on ${PORT}...`);
})
