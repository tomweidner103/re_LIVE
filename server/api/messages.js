const router = require("express").Router();
const { Message, User } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const messages = await Message.findAll();
    res.json(messages.sort((a, b) => b.id - a.id));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let message
    if(!req.user){
      req.body.userId = null
      message = await Message.create(req.body,);
    }else{
      req.body.userId = req.user.id
      message = await Message.create(req.body, {include: [{model:User}]});
    }
      res.json(message);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
