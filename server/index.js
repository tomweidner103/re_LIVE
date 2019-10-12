const express = require("express");
const app = express();
const volleyball = require("volleyball");
const path = require("path");
const { db } = require("./db");
const PORT = process.env.PORT || 4334;
const socketio = require("socket.io");

const createApp = () => {
  app.use(express.json());
  app.use(volleyball);
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, "../public")));

  app.get("/api/messages", async (req, res, next) => {
    try {
      const messages = await Message.findAll();
      res.json(messages);
    } catch (err) {
      next(err);
    }
  });

  app.post("/api/messages", async (req, res, next) => {
    try {
      const message = await Message.create(req.body);
      res.json(message);
    } catch (err) {
      next(err);
    }
  });

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error");
  });
};

const startListening = () => {
  const server = app.listen(PORT, () => {
    console.log(`serving you at port${PORT}`);
  });
  const io = socketio(server);
  require("./socket")(io);
};

// const syncDb = () => db.sync()
const syncDb = () => db.sync({ force: true });

async function bootApp() {
  await syncDb();
  await createApp();
  await startListening();
}

bootApp();

module.exports = app;
