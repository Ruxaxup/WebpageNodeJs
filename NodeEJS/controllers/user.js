'use strict'

var User = require("../model/user");
var Membership = require('../model/membership')

function getUser() {

}

function getUsers() {

}

function updateUser(id) {

}

function deleteUser() {

}

function saveUser(user) {

}

function loadProfile(req, res) {
  if(req.user.membership){
    process.nextTick(() => {
      Membership.findById(req.user.membership, (err, membership) => {
        if (err) {
          console.log(err);
          throw err;
        }
        //Si el usuario tiene una membresia, la mandamos a locals
        if (membership) {
          res.render('dashboards/member.ejs', {
            user: req.user,
            membership: membership
          });
        }
      });
    });
  }else{
    //Si no, solo mandamos la información del usuario
    res.render('dashboards/user.ejs', {
      user: req.user
    });
  }

}

module.exports = {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  saveUser,
  loadProfile
}
