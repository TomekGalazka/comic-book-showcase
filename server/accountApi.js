const exprees = require("express")
const LOGS = exprees.Router()
const LogActions = require("./accountActions")


LOGS.post("/login", LogActions.login)
LOGS.delete("/login", LogActions.deleteAccount)
LOGS.post("/register", LogActions.register)
LOGS.put("/password", LogActions.changePassword)
LOGS.put("/comparePassword", LogActions.comparePasswords)





module.exports = LOGS