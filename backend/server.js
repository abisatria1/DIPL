const app = require("./app")
require("dotenv").config()
// database
const db = require("./config/database.config")
const relation = require("./config/relation.config")
const port = process.env.port

app.listen(port, () => {
  db.sync({})
    .then(() => console.log(`Application is running on http://localhost:3000`))
    .catch((err) => console.log(err.message))
})
