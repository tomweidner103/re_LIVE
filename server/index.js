const express = require("express");
const app = express();
const volleyball = require("volleyball");
const path = require("path");
const db  = require("./db");
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 4334;
const socketio = require("socket.io");
const {Message, User} = require('../server/db/models')

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  app.use(express.json());
  app.use(volleyball);
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(express.static(path.join(__dirname, "../public")));
  app.use('/api', require('./api'))
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

const syncDb = () => db.sync()
// const syncDb = () => db.sync({ force: true });

async function bootApp() {
  syncDb()
  .then(async () => {
    const u1 = await User.create({name: "Tom"})
    Message.create({body: "Hi Alex", userId: u1.id})
  })
  .catch()
  await sessionStore.sync()
  await createApp();
  await startListening();
}

bootApp();

module.exports = app;
