const { container } = require("./depedency-injection.config")
const db = container.resolve("db")
// model
const UserModel = require("../services/user/user.model")
const CampaignerModel = require("../services/campaigner/campaigner.model")
const ParticipantModel = require("../services/participant/participant.model")
const EventModel = require("../services/event/event.model")
const EventParticipantModel = require("../services/participant/event-participant.model")

UserModel.hasOne(ParticipantModel)
ParticipantModel.belongsTo(UserModel)

UserModel.hasOne(CampaignerModel)
CampaignerModel.belongsTo(UserModel)

ParticipantModel.belongsToMany(EventModel, {
  through: { model: EventParticipantModel, unique: false },
})
EventModel.belongsToMany(ParticipantModel, {
  through: { model: EventParticipantModel, unique: false },
})

CampaignerModel.hasMany(EventModel)
EventModel.belongsTo(CampaignerModel)

db.User = UserModel
db.Campaigner = CampaignerModel
db.Participant = ParticipantModel
db.Event = EventModel
db.EventParticipant = EventParticipantModel
