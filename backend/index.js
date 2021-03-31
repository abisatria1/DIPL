const express = require('express')
const app = express()
const {participantService} = require('./services')

app.get('/',(req,res) => {
    const participant = new participantService()
    res.send(participant.deleteParticipant())
})

app.listen(3000,() => {
    console.log('This app is running on port 3000')
})