const app = require("./src/app");

server = app.listen(8800, () => {
   console.log("Server is running on port 8800.");
});

process.on("SIGINT", () => {
   console.log("Server is shutting down.");
   server.close(() => {
      console.log("Server is shut down.");
   });
});
