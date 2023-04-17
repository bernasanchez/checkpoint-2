const express = require("express");//iniciamos express
const morgan = require("morgan");
const chalk = require("chalk");
const path = require("path");

const routes = require("./routes"); //requerimos las rutas
const app = express(); //inicializamos la instancia de express

if (process.env.MODE !== "grade") {
  app.use(
    morgan(
      "      ↓ received :method :url · responded :status :res[Content-Type]"
    )
  );
}

//Mw para tranf json los req 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Comprobamos que funcione el server
app.get("/", function (req, res, next) {
  res.send("Welcome to Articles! Check out our lovely routes.");
});

//Mw routes 
app.use("/", routes);

// custom error handling
app.use(function (err, req, res, next) {
  // just in case
  if (!err.stack || !err.message) next(err);
  // clean up the trace to just relevant info
  const cleanTrace = err.stack
    .split("\n")
    .filter((line) => {
      // comment out the next two lines for full (verbose) stack traces
      const projectFile = line.indexOf(__dirname) > -1; // omit built-in Node code
      const nodeModule = line.indexOf("node_modules") > -1; // omit npm modules
      return projectFile && !nodeModule;
    })
    .join("\n");
  // colorize and format the output
  console.log(chalk.magenta("      " + err.message));
  console.log("    " + chalk.gray(cleanTrace));
  // send back error status
  res.status(err.status || 500).end();
});


//exportamos el modulo
module.exports = app;
