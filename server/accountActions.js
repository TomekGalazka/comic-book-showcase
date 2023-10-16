const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const schema = new mongoose.Schema({
  email: String,
  nick: String,
  password: String
});

const LOGIN = mongoose.model("ActionsLog", schema);

class LogActions {
  async register(req, res) {
    const { email, nick, password } = req.body;
    const sameNick = await LOGIN.findOne({ nick: req.body.nick });
    const sameEmail = await LOGIN.findOne({ email: req.body.email });
    if (sameNick) { res.json("Nickname already in use"); }
    else if (sameEmail) { res.json("Email already in use"); }
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const log = new LOGIN({ email, nick, password: hashedPassword });
      await log.save();
      res.json("user created");
    }
  }

  async login(req, res) {
    const { nick, password } = req.body;
    const user = await LOGIN.findOne({ nick });
    if (!user) {
      res.json("user not found");
      return;
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        res.send(["user found", user])
      }
      if (!result) {
        res.send("user not found")
      }
      if (err) {
        res.send("An error has occured, please try again")
      }
    });
  }


  async deleteAccount(req, res) {
    await LOGIN.deleteOne({ nick: req.body.nick })
      .then(account => {
        res.json(account);
      })
      .catch(error => {
        console.error(error);
      });
  }

  async changePassword(req, res) {
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
    await LOGIN.findOne({ password: req.body.hashedPassword })
      .then(account => {
        account.password = hashedNewPassword
        account.save()
        res.send("Password Changed")
      })
  }

  async comparePasswords(req, res) {
    bcrypt.compare(req.body.currentPassword, req.body.hashedPassword, (err, result) => {
      if (result) {
        res.send("Password correct")
      }
      if (!result) {
        res.send("Password incorrect")
      }
      if (err) {
        res.send("An error has occured, please try again")
      }
    });
  }
}



module.exports = new LogActions();