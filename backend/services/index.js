const participantService = require('./participant')
const eventService = {} // mock
const userService = require('./user') 
const campaignerService = require('./campaigner') 
// Service mapping
module.exports = {
    participantService,
    eventService,
    userService,
    campaignerService
}