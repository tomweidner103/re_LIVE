const router = require('express').Router()
const {Message} = require('../db')

router.get('/', async (req,res,next) => {
    try{
        const messages = await Message.findAll()
        res.json(messages.sort((a,b) => b.id - a.id))
    }catch(err){
        next(err)
    }
})

router.post('/', async (req,res,next) => {
    try{
        const message = await Message.create(req.body)
        res.json(message)
    }catch(err){
        next(err)
    }
})


module.exports = router