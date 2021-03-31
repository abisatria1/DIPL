const mysql = require("mysql")

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_twibbon_maker",
})

class Service {
  initconnection = ""
  constructor() {
    this.initconnection = "mysql.init()"
    this.inserData = (tableName, data) => {
      con.connect(function (err) {
        if (err) throw err

        let values = []
        for (const item in data) {
          values.push(data[item])
        }
        const stringValues = values.join(",")
        var sql = `INSERT INTO ${tableName} VALUES (${stringValues})`
        con.query(sql, function (err, result) {
          if (err) throw err
          console.log("1 record inserted")
        })
      })
    }
  }
}

module.exports = Service
