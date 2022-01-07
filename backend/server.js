const app = require("./app");
require("dotenv").config();
// database
const db = require("./config/database.config");
const relation = require("./config/relation.config");
const port = process.env.PORT || 3000;

app.listen(port, () => {
  db.sync({})
    .then(() => console.log(`Application is running on PORT ${port}`))
    .catch((err) => console.log(err.message));
});
