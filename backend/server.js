const app = require("./app")

// database
const db = require("./config/database.config")
const relation = require("./config/relation.config")

app.listen(3000, () => {
  db.sync({})
    .then(() => console.log(`Application is running on http://localhost:3000`))
    .catch((err) => console.log(err.message))
})
