/**
 * @brief - app.listen() exports a server object,
 *          keeps the server up for 6 (etc) secnds, then close the server...
 *          Fails when
 *          . There was some error in some file (outside routes)
 *          . Can't connect to database
 *          . The code/dependency breaks on a node version or not (specified in workflow)
 */

const server = require("./app");

let handle = setTimeout(() => {
	server.close();
	console.log("Exiting gracefully :D");
	process.exit(0); // OK
}, 6000); // waits for 6 seconds before exiting

process.on("unhandledRejection", () => {
	clearTimeout(handle);

	server.close();
	process.exit(-1); // NOT_OK
})

process.on("uncaughtException", () => {
	clearTimeout(handle);

	server.close();
	process.exit(-2); // NOT_OK
})
