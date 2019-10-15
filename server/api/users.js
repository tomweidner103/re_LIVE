const router = require('express').Router()
const { Message, User } = require("../db/models");

router.get('/', async (req,res,next) => {
    try{
        const user = await User.findAll()
        res.json(user)
    }catch(err){
        next(err)
    }
})

router.post('/', async (req,res,next) => {
    try {
        const user = await User.findOrCreate({
            where: {name: req.body.name}
        })
        console.log('user', user[0])
        req.login(user[0], err => (err ? next(err) : res.json(user[0])))
    }catch(err){
        next(err)
    }
})

router.post('/logout', (req, res) => {
    req.logout()
    req.session.destroy()
    res.redirect('/')
  })

router.get('/me', (req, res) => {
    res.json(req.user)
})
module.exports = router