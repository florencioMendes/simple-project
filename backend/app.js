const { app } = require("./bin/server")
const index = require("./routes/index")
const users = require("./routes/users")

app.use("/", index)
app.use("/user", users)
