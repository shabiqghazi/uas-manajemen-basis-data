const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var usersSchema = new Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jenisKelamin: String,
  status: String,
});

var usersModel = mongoose.model("Users", usersSchema);

module.exports = usersModel;
