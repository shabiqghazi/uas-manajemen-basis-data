const mongoose = require("mongoose");
const usersModel = require("../model/model");
const dotenv = require("dotenv");
dotenv.config({ path: "../../config.env" });
const jwt = require('jsonwebtoken');

const checkAuthFailed = (req, res) => {
  if(jwt.decode(req.headers.authorization.split(' ')[1]).isLogin === true){
    return false
  }
}

exports.addUser = (req, res) => {
  console.log(req.cookies)
  if(checkAuthFailed(req,res)){
    res.redirect('/login')
  } else {
    console.log(req.body)
    const user = new usersModel({
      nama: req.body.nama,
      email: req.body.email,
      jenisKelamin: req.body.jenisKelamin,
      status: req.body.status,
    });
    user.save();
    try {
      res.redirect(process.env.BASE_URL);
    } catch (error) {
      console.log(error);
    }
  }
};

exports.findUser = (req, res) => {
  if(checkAuthFailed(req,res)){
    res.redirect('/login')
  } else {
    if (req.query.id) {
      usersModel
        .findById(req.query.id)
        .then((user) => res.send(user))
        .catch((err) => console.log(err));
    } else {
      usersModel
        .find()
        .then((users) => {
          res.send(users);
        })
        .catch((error) => {
          res.send({ message: error.message });
        });
    }
  }
};

exports.updateUser = (req, res) => {
  if(checkAuthFailed(req,res)){
    res.redirect('/login')
  } else {

    usersModel
      .findByIdAndUpdate(req.params.id, req.body)
      .then((response) => res.send({ message: "Data berhasil diubah" }))
      .catch((err) => console.log(err));
  }
};

exports.deleteUser = async (req, res) => {
  if(checkAuthFailed(req,res)){
    res.redirect('/login')
  } else {

    usersModel
      .findByIdAndDelete(req.params.id)
      .then((response) => res.send({ message: "Data berhasil dihapus" }))
      .catch((err) => console.log(err));
  }
};

exports.login = (req, res) => {
  const credential = {
    id:1,
    nama: 'Shabiq Ghazi Arkaan',
    email: 'shabiqghazi@gmail.com',
    password: '123456'
  }
  if(req.body.email){
    if(req.body.email === credential.email){
      if(req.body.password === credential.password){
        const user = {
          id: credential.id,
          nama: credential.nama,
          email: credential.email,
          isLogin: true
        }
        req.session.isLogin = true
        req.session.email = credential.email
        jwt.sign(user, 'pr1v4t3 k3y', {expiresIn:'600s'}, (err,token) => {
          if(err){
            console.log(err)
            res.sendStatus(304)
            return
          }
          const Token = token
          res.cookie('token', Token).redirect('/')
        })
      } else {
        res.redirect('/login')
      }
    } else {
      res.redirect('/login')
    }
  } else {
    res.redirect('/login')
  }
}
exports.logout = (req,res) => {
  res.clearCookie('token')
  return res.redirect('/login')
}
// jwt-auth
exports.verifyUser = (req,res,next) => {
  const token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, 'pr1v4t3 k3y', (err, data) => {
    if(err){
      console.log(err)
      res.json(err)
      return
    }
    next()
  })
  
}