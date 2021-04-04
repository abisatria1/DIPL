const { container } = require("./depedency-injection.config")
const db = container.resolve("db")
// model
const UserModel = require("../services/user/user.model")
const CampaignerModel = require("../services/campaigner/campaigner.model")
const ParticipantModel = require("../services/participant/participant.model")

UserModel.hasOne(ParticipantModel)
ParticipantModel.belongsTo(UserModel)

UserModel.hasOne(CampaignerModel)
CampaignerModel.belongsTo(UserModel)

db.User = UserModel
db.Campaigner = CampaignerModel
db.Participant = ParticipantModel
