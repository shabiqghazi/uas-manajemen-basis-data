const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "../../config.env" });

const checkAuthFailed = (req, res) => {
  if(!req.session.isLogin){
    res.redirect('/login')
  }
}
const getToken = (req) => {
  return req.cookies.token
}

exports.homePage = async (req, res) => {
  checkAuthFailed(req,res)
  const loggedUser = {
    email: req.session.email,
    isLogin: req.session.isLogin
  }
  let users = [];
  await axios(`${process.env.BASE_URL}api/users`, 
  {
    headers: {
      Authorization: `Bearer ${getToken(req)}`
    }
  })
    .then((res) => {
      users = res.data
      })
    .catch((err) => console.log(err));
  console.log(users)
  res.render("index", { users, loggedUser });
};

exports.addUser = (req, res) => {
  checkAuthFailed(req,res)
  res.render("add_user");
};

exports.updateUser = async (req, res) => {
  checkAuthFailed(req,res)
  let user = {};
  await axios(`${process.env.BASE_URL}api/users`, {
    params: {
      id: req.query.id,
    },
    headers: {
      Authorization: `Bearer ${getToken(req)}`
    }
  })
    .then((res) => {
      user = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  res.render("update_user", { user });
};

exports.loginPage = (req, res) => {
  res.render("login")
}