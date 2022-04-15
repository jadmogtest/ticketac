var express = require('express');
var router = express.Router();

var userModel = require('../models/users')

/* GET users listing. */
router.post('/signup', async function(req, res, next) {

  var usercheck = await userModel.findOne({ email :req.body.emailFr })

  if(!usercheck) {

  var newUser = new userModel({

    name: req.body.usernameFr,
    firstname: req.body.firstnameFr,
    email: req.body.emailFr,
    password: req.body.passwordFr,
    
  })

  var newUserSave = await newUser.save();

  req.session.user = {
    sessionname : newUserSave.name,
    id : newUserSave._id
  }

  console.log(req.session.user)
  res.redirect('/homepage')

} else {
  res.redirect ('/')
}

});



router.post('/signin', async function(req, res, next) {

  var check = await userModel.findOne(
    {
      email : req.body.emailFr,
      password :req.body.passwordFr,
    }
  )

  if (check){
    req.session.user = {
      sessionname : check.name,
      id : check._id
    }

  res.redirect('/homepage')

  }
  else {
    res.redirect('/')
  }


});

module.exports = router;
