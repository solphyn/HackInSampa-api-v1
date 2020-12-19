"use strict";

const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

/*   await server.register(require("hapi-auth-jwt2"));
  server.auth.strategy("jwt", "jwt", {
    key: "HackInSampa",
    validate,
    verifyOptions: { algorithms: ["HS256"] },
  });

  server.auth.default("jwt"); */

  await server.register({
    plugin: require("hapi-router"),
    options: {
      routes: "src/structs/**/routes/*.js",
    },
  });

  mongoose.set("debug", true);

  await mongoose.connect(
    `mongodb://localhost:27017/coVida`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) throw err;
      console.log("db conectado");
    }
  );


  await server.start();
  console.log("Servidor online! %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
