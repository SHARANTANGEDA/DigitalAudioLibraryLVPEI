const getAge =require( '../../validations/ageValidation/getAge')
const categorizeAge = require('../../validations/ageValidation/categorizeAge')
const getQuarter = require('../../validations/ageValidation/getQuarter')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const sqlDB = require('../../models')

// const smtpTransport = require("nodemailer-smtp-transport");

const validatePassword = require('../../validations/ChangePassword')
const validateLoginInput = require('../../validations/login')
const validateChangeInput = require('../../validations/editProfile/editProfileLVPEI')
const validateWorldChangeInput = require('../../validations/editProfile/editProfileWorld')
const validateWorldRegisterInput = require('../../validations/worldRegister')
const validateBookInput = require('../../validations/bookUploadForm')
const validateNewPassword = require('../../validations/resetPassword')
const validateSearchInput = require('../../validations/search')
const User = require('../../mongoModels/User');
const Music = require('../../mongoModels/Music');
const nodemailer = require("nodemailer");
const shortid = require('shortid');
const senderEmail = require('../../config/keys').senderEmail
const senderPassword = require('../../config/keys').senderPassword

//@Register
router.post('/register', (req, res) => {
  const { errors, isValid } = validateWorldRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({ emailId: req.body.emailId }).then(async user => {
    if (user) {
      errors.emailId = 'Account already exists please use your password to login'
      return res.status(400).json(errors)
    } else {
      let pin = shortid.generate()
      console.log('here')
      // let transporter = nodemailer.createTransport({
      //   host: 'lvp.lvpei.org',
      //   ignoreTLS: true,
      //   port: 25,
      //   secureConnection: 'false', // false for TLS
      //   type:'smtp',
      //   secure: false, // true for 465, false for other ports
      //   auth: {
      //     user: senderEmail, // generated ethereal user
      //     pass: senderPassword // generated ethereal password
      //   },
      //   // tls:{
      //   //   ciphers:'SSLv3'
      //   // }
      //   tls: {
      //     rejectUnauthorized: false
      //   }
      // });
      // let transporter = nodemailer.createTransport({
      //   host: `lvp.lvpei.org`,
      //   ignoreTLS: true,
      //   port: 25,
      //   // secureConnection: false, // false for TLS
      //   authMethod: 'LOGIN',
      //   auth: {
      //     user: senderEmail, // generated ethereal user
      //     pass: senderPassword // generated ethereal password
      //   },
      //   secure: false,
      //   // tls:{
      //   //   ciphers:'SSLv3'
      //   // }
      //   tls: {
      //     rejectUnauthorized: false
      //   }
      // })
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: senderEmail, // generated ethereal user
          pass: senderPassword // generated ethereal password
        },
        secure: false,
      })
      await transporter.verify(function(error, success) {
        if (error) {
          console.log({ERROR:error});
        } else {
          console.log("Server is ready to take our messages");
        }
      });
      console.log(transporter)
      let info = await transporter.sendMail({
        from: '"Digital Audio Library LVPEI" <support.dal@lvpei.org>', // sender address
        to: req.body.emailId, // list of receivers
        subject: "Audio Digital Library Email Verification", // Subject line
        text: "pin:"+pin, // plain text body
        html: "<div><h2>Use the PIN below to verify your email</h2></div>"
          +"<h3>Verification Pin:</h3>" + `<h1>${pin}</h1>` // html body
      })
        .catch(err =>{
        console.log({HERE:err})
      });
      console.log('below')
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: req.body.password,
        address: req.body.address,
        pinCode: req.body.pinCode,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country.label,
        otpKey: pin,
        dob: req.body.dob,
        gender: req.body.gender.value,
        qualification: req.body.qualification.value,
        role: 'world'
      })
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser
            .save()
            .then( user => {
              let payload
              if(user.access) {
                console.log(new Date(), user.time)
                // && dateDiffInDays(new Date(), user.time)>2
                if(!user.verified) {
                  payload = { id: user._id,role: user.role, emailId: user.emailId, verified: false}
                }else {
                  payload = { id: user._id,role: user.role, emailId: user.emailId, verified: true}
                }
              }else {
                errors.emailId='Your account is blocked!!'
                return res.status(401).json(errors)
              }
              jwt.sign(payload, keys.secretOrKey, { expiresIn: '12h' },
                (err, token) => {
                  console.log(payload)
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  })
                })
            })
            .catch(err => console.log(err))
        })
      })
    }
  })
})

router.post('/search',(req, res) => {
  const { errors, isValid } = validateSearchInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  if(req.body.category === 'title') {
    let dummy=[], arr=[]
    Music.find().then( async music => {
      console.log({m:music})
      if (music.length === 0) {
        return res.json({ success: false })
      }
      music.map(async record => {
        dummy.push(new Promise((resolve, reject) => {
          let title = record.title.toLowerCase()
          let key = req.body.search.toLowerCase()
          console.log({title:title, key: key, comp: title.includes(key)})
          if (title.includes(key)) {
            arr.push(record)
          }
        }))
      })
      res.json({ results: await Promise.all(arr), success: true })
    }).catch(err => {
      res.json({success: false})
    })
  }else if(req.body.category === 'author') {
    let dummy=[], arr=[]
    Music.find().then( async music => {
      if (music.length === 0) {
        return res.json({ success: false })
      }
      music.map(async record => {
        dummy.push(new Promise((resolve, reject) => {
          let author = record.author.toLowerCase()
          let key = req.body.search.toLowerCase()
          if (author.includes(key)) {
            arr.push(record)
          }
        }))
      })
      res.json({ results: await Promise.all(arr), success: true })
    }).catch(err => {
      res.json({success: false})
    })
  }
})


router.post('/resetPasswordSend',(req, res) => {
  let errors = {}
  User.findOne({emailId:req.body.emailId}).then(async user => {
    if (!user) {
      errors.email = 'Please enter the correct EmailId'
      return res.status(400).json(errors)
    }
    let pin = shortid.generate()
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: senderEmail, // generated ethereal user
        pass: senderPassword // generated ethereal password
      },
      secure: false,
    })
    await transporter.verify(function (error, success) {
      if (error) {
        console.log({ ERROR: error });
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    let info = await transporter.sendMail({
      from: '"Digital Audio Library LVPEI" <support.dal@lvpei.org>', // sender address
      to: req.body.emailId, // list of receivers
      subject: "Audio Digital Library Reset Password", // Subject line
      text: "pin:" + pin, // plain text body
      html: "<div><h2>Use the PIN below to Reset Password</h2></div>"
        + "<h3>Verification Pin:</h3>" + `<h1>${pin}</h1>` // html body
    })
      .catch(err => {
        console.log({ HERE: err })
      });
    user.otpKey=pin;
    user.save().then(user => {
      res.json({sent: true})
    })
  })
})
router.post('/resetPasswordReceive',(req, res) => {
  User.findOne({emailId: req.body.emailId}).then(user => {
    console.log({key:user.otpKey, pin:req.body.pin})
    if(user.otpKey===req.body.pin) {
      let payload
      if (user.access) {
        console.log(new Date(), user.time)
        // && dateDiffInDays(new Date(), user.time)>2
        if (!user.verified) {
          payload = { id: user._id, role: user.role, emailId: user.emailId, verified: false }
        } else {
          payload = { id: user._id, role: user.role, emailId: user.emailId, verified: true }
        }
      } else {
        errors.emailId = 'Your account is blocked!!'
        return res.status(401).json(errors)
      }
      jwt.sign(payload, keys.secretOrKey, { expiresIn: '12h' },
        (err, token) => {
          console.log(payload)
          res.json({
            success: true,
            token: 'Bearer ' + token
          }).catch(err => console.log(err))
        })
    }else {
      let errors={}
      errors.pin='You have entered In-Correct Verification code'
      return res.status(400).json(errors);
    }
  })
})
router.post('/resetPasswordEnter', passport.authenticate('world', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateNewPassword(req.body)
    if (!isValid) {
      return res.status(404).json(errors)
    }
    let newPassword = req.body.newPassword
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPassword, salt, (err, hash) => {
        if (err) throw err
        newPassword = hash
        User.findOneAndUpdate({_id: req.user._id}, { password: newPassword }, (err, res) => {
          if (err) throw err
        }).then(user => {
          res.json({ success: true })
        }).catch(err => {
          return res.status(404).json({ failed: 'Your password is not updated', err })
        })
      })
    })
})
router.post('/verifyEmail',passport.authenticate('world',{session: false}),(req, res) => {
  User.findById(req.user.id).then(user => {
    if (!user) {
      return res.status(400).json('err')
    }
    if(req.body.pin.length===0) {
      let errors={}
      errors.pin = 'Please enter the verification code to sent to your mail'
      return res.status(400).json(errors)
    }
    console.log(req.body.pin, user.otpKey)
    if(user.otpKey === req.body.pin) {
      console.log({otp: user.otpKey, pin: req.body.pin})
      user.verified = true;
      user.otpKey = null
      user.save().then(user => {
        let payload
        if(user.access) {
          // && dateDiffInDays(new Date(), user.time)>2
          if(!user.verified) {
            payload = { id: user._id,role: user.role, emailId: user.emailId, verified: false}
          }else {
            payload = { id: user._id,role: user.role, emailId: user.emailId, verified: true}
          }
        }else {
          errors.emailId='Your account is blocked!!'
          return res.status(401).json(errors)
        }
        jwt.sign(payload, keys.secretOrKey, { expiresIn: '12h' },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
          })
      })
        .catch(err => console.log(err))
    } else {
      let errors={pin:'Pin entered is wrong'}
      res.status(404).json(errors)
    }
  })
})

router.get('/sendAgain',passport.authenticate('world',{session: false}),(req, res) => {
  console.log({user: req.user.id})
  User.findById(req.user.id).then(async user => {
    let pin = shortid.generate()
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: senderEmail, // generated ethereal user
        pass: senderPassword // generated ethereal password
      },
      secure: false,
    })
    let info = await transporter.sendMail({
      from: '"Digital Audio Library LVPEI" <support.dal@lvpei.org>', // sender address
      to: user.emailId, // list of receivers
      subject: "Audio Digital Library Email Verification", // Subject line
      text: "pin:" + pin, // plain text body
      html: "<div><h4>Use the PIN below to verify your email</h4></div>"
        + "<h3>Verification Pin:</h3>" +`<h1>${pin}</h1>`// html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    user.otpKey = pin
    user.save().then(user => {
      res.json({success: true})
    })
  }).catch(err => {
    res.json({success: false})
  })
})



//@desc Login
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const emailId = req.body.emailId
  const password = req.body.password

  User.findOne({ emailId }).then(user => {

    if (!user) {
      errors.emailId = 'User not Found'
      return res.status(400).json(errors)
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        let payload
        if(user.role ==='super_admin') {
          payload = { id: user.id,role: user.role, emailId: user.emailId}
        }else if(user.role === 'world') {
          if(user.access) {
            if(!user.verified) {
              payload = { id: user._id,role: user.role, emailId: user.emailId, verified: false}
            }else {
              payload = { id: user._id,role: user.role, emailId: user.emailId, verified: true}
            }
          }else {
            errors.emailId='Your account is blocked!!'
            return res.status(401).json(errors)
          }
        } else if(user.role === 'lvpei') {
          if(user.access) {
            payload = { id: user.id,role: user.role, emailId: user.emailId}
          }else {
            errors.emailId='Your access to this site is revoked!!'
            return res.status(401).json(errors)
          }
        }
        jwt.sign(payload, keys.secretOrKey, { expiresIn: '12h' },
          (err, token) => {
          console.log(payload)
            res.json({
              success: true,
              token: 'Bearer ' + token
            })
        })
      } else {
        errors.password = 'Incorrect Password'
        return res.status(400).json(errors)
      }
    })
  })
})



//Change Password
router.post('/changePassword', passport.authenticate('all', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePassword(req.body)
    if (!isValid) {
      return res.status(404).json(errors)
    }
    const password = req.body.password
    let newPassword = req.body.newPassword
    bcrypt.compare(password, req.user.password).then(isMatch => {
      if (isMatch) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err
            newPassword = hash
            User.findOneAndUpdate({_id: req.user._id}, { password: newPassword }, (err, res) => {
              if (err) throw err
            }).then(user => {
              res.json({ success: 'password is changed successfully' })
            }).catch(err => {
              return res.status(404).json({ failed: 'Your password is not updated', err })
            })
          })
        })
      } else {
        errors.password = 'Incorrect Password'
        return res.status(400).json(errors)
      }
    })
})

router.get('/home',(req, res) => {
  Music.find({access:true}).sort({uploadAt: -1}).then( records => {
    res.json({ all: records })
  })
});
router.get('/removedBooks', passport.authenticate('lvpei', { session: false }), (req, res) => {
  Music.find({access:false}).sort({uploadAt: -1}).then( records => {
    res.json({ all: records })
  })
});

router.get('/getFavBooks', passport.authenticate('world', { session: false }), (req, res) => {
  Music.find().then(async records => {
    let arr = [], dummy=[]
    records.map(record => {

      dummy.push(new Promise((resolve, reject) => {
        // console.log(record)
        let rateIndex = record.fav.findIndex((item, i) => {
          return item.id === req.user.id
        })
        if ((rateIndex !== -1) && (record.access)) {
          console.log( rateIndex)
          arr.push(record)
        }
      }))
    })
    console.log(await Promise.all(arr))
    res.json(await Promise.all(arr))
  })
})

// router.get('/addPlay/:id',(req, res) => {
//   Music.findByIdAndUpdate(req.params.id,{$inc:{plays: 1}}).then( music => {
//     let today = new Date();
//     let month = today.getMonth()
//     let year = today.getFullYear()
//     let quarter = getQuarter()
//     sqlDB.User.create({age:0,ageCategory:0,gender: 'NA',
//       qualification: 'NA', address:'NA', pinCode: 0,
//       city: 'NA', state: 'NA', country: 'NA',
//       status:'play',bookCategory: music.category, bookLanguage: music.language,
//       bookAuthor: music.author, month:month, year: year, quarter: quarter}).then(sqlRow => {
//       res.json({ success: true })
//     })
//   })
// })
router.get('/catalogue', (req, res) => {
    let  dummy = [], school1 =[], all=[]
    let inter=[],school2=[],ug=[], law=[],psy=[],pg=[], ce=[], eg=[], cs=[], reg=[], ot=[]

    Music.find({access:true}).then(async records => {

      records.map(async record => {
        dummy.push(new Promise((resolve, reject) => {
          console.log({record:record})
          all.push(record)
          if(record.category==='School (I – V)') {
            school1.push(record)
          }else if(record.category==='School (VI – X)') {
            school2.push(record)
            console.log(school2.length)
          }else if(record.category==="Intermediate (XI & XII)") {
            inter.push(record)
          }else if(record.category==='Undergraduate') {
            ug.push(record)
          }else if(record.category==='Postgraduate') {
            pg.push(record)
          }else if(record.category==='Law'){
            law.push(record)
          }else if(record.category==='Psychology'){
            psy.push(record)
          }else if(record.category==='Competitive Exam'){
            ce.push(record)
          }else if(record.category==='English Grammar'){
            eg.push(record)
          }else if(record.category==='Children Stories'){
            cs.push(record)
          }else if(record.category==='Religious'){
            reg.push(record)
          } else if(record.category==='Other'){
            ot.push(record)
          }
          resolve(record)
        }))
      })
      res.json({
        all: await Promise.all(all),
        school1: await Promise.all(school1),
        school2: await Promise.all(school2),inter: await Promise.all(inter),ug: await Promise.all(ug),
        pg: await Promise.all(pg), law: await Promise.all(law),psy: await Promise.all(psy), ce: await Promise.all(ce),
        eg: await Promise.all(eg), cs: await Promise.all(cs), reg: await Promise.all(reg), ot: await Promise.all(ot)
      })

    })
});


router.get('/addAuthPlay/:id',passport.authenticate('world',{session: false}),(req, res) => {
  User.findById(req.user.id).then(user => {
    Music.findByIdAndUpdate(req.params.id, { $inc: { plays: 1 } }).then(music => {
      let age=getAge(user.dob)
      let ageCategory = categorizeAge(age)
      let today = new Date();
      let month = today.getMonth()
      let year = today.getFullYear()
      let quarter = getQuarter()
      sqlDB.User.create({age:age,ageCategory:ageCategory,gender: user.gender,
        qualification: user.qualification, address: user.address, pinCode: user.pinCode,
        city: user.city, state: user.state, country: user.country,
        status:'play',bookCategory: music.category, bookLanguage: music.language,
        bookAuthor: music.author, month:month, year: year, quarter: quarter}).then(sqlRow => {
        res.json({ success: true })
      })
    })
  })
})

router.get('/changeBook/:id', passport.authenticate('lvpei', { session: false }), (req, res) => {
  Music.findById(req.params.id).then( record => {
    res.json(record)
  })
})
router.get('/myAccount', passport.authenticate('non_super', { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => {
        res.json(user)
        // res.json({firstName: user.firstName, emailId: user.emailId, lastName: user.lastName})
      }).catch(err => {
      return res.status(404).json({ err })
    })
  })

router.post('/myAccount/change', passport.authenticate('non_super', { session: false }),
  (req, res) => {
  User.findOne({emailId: req.user.emailId}).then(user => {
    if(user.role==='world') {
      const {errors, isValid} = validateWorldChangeInput(req.body, user)
      if (!isValid) {
        return res.status(400).json(errors);
      }
      user.firstName = req.body.firstName
      user.lastName = req.body.lastName
      user.pinCode = req.body.pinCode
      user.city = req.body.city
      user.state = req.body.state
      user.country = req.body.country
      user.address = req.body.address
      user.save().then(user => {
        res.json({success: true})
      })
    }else if(user.role==='lvpei') {
      const { errors, isValid } = validateChangeInput(req.body, user)
      if (!isValid) {
        return res.status(400).json(errors);
      }
      user.firstName = req.body.firstName
      user.lastName = req.body.lastName
      user.save().then(user => {
        res.json({success: true})
      })
    }

  })
  }
);

router.post('/updateBookInfo/:id', passport.authenticate('lvpei', { session: false }),
  (req, res) => {
      Music.findById(req.params.id).then(book => {
        const {errors, isValid} = validateBookInput(req.body)
        if (!isValid) {
          return res.status(400).json(errors);
        }
        book.category= req.body.category
        book.title= req.body.title
        book.author= req.body.author
        book.language= req.body.language
        book.grade= req.body.grade
        book.organization= req.body.organization

        book.save().then(music => {
          res.json({success: true})
        }).catch(err => {
          console.log(err)
        })
      })
  }
);

module.exports = router