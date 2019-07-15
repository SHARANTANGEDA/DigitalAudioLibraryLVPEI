const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const excel = require('exceljs');
const validateRegisterInput = require('../../validations/register')
const validateResetPassword = require('../../validations/resetPassword')
const User = require('../../mongoModels/User')
const Music = require('../../mongoModels/Music');

// router.post('/registerSA',(req, res) => {
//   // const { errors, isValid } = validateRegisterInput(req.body)
//   // if (!isValid) {
//   //   return res.status(400).json(errors)
//   // }
//   User.findOne({ emailId: req.body.emailId }).then(user => {
//     console.log(user)
//     if (user) {
//       return res.status(400).json('errors')
//     } else {
//       const newUser = new User({
//         emailId: req.body.emailId,
//         password: req.body.password,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         role: 'super_admin'
//       })
//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//           if (err) throw err
//           newUser.password = hash
//           newUser.save().then(user => {
//             res.json({success: true,user})
//           }).catch(err => {
//             console.log(err)
//             res.json({error: 'creating the user'})
//           })
//         })
//       })
//     }
//   })
// })
router.post('/register', passport.authenticate('super_admin',{session: false}),(req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({ emailId: req.body.emailId }).then(user => {
    if (user) {
      errors.emailId = 'Account already exists please create with different name'
      return res.status(400).json(errors)
    } else {
      const newUser = new User({
        emailId: req.body.emailId,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: 'lvpei',
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser.save().then(user => {
            res.json({success: true})
          }).catch(err => {
            console.log(err)
            res.json({error: 'creating the user'})
          })
        })
      })
    }
  })
})

router.get('/home', passport.authenticate('all_lvpei', { session: false }), (req, res) => {
  User.find().then(async users => {
    let lvpei = [], world = [], dummy = [], school1 =[], all=[]
    let inter=[],school2=[],ug=[], law=[],psy=[],pg=[], ce=[], eg=[], cs=[], reg=[], ot=[]

      Music.find().then(async records => {
        users.map(async user => {
          dummy.push(new Promise((resolve, reject) => {
            if (user.role === 'lvpei') {
              lvpei.push(user)
            } else if (user.role === 'world') {
              world.push(user)
            }
          }))
        })
          records.map(async record => {
            dummy.push(new Promise((resolve, reject) => {
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
          lvpei: await Promise.all(lvpei),
          world: await Promise.all(world),
          all: await Promise.all(all),
          school1: await Promise.all(school1),
          school2: await Promise.all(school2),inter: await Promise.all(inter),ug: await Promise.all(ug),
          pg: await Promise.all(pg), law: await Promise.all(law),psy: await Promise.all(psy), ce: await Promise.all(ce),
          eg: await Promise.all(eg), cs: await Promise.all(cs), reg: await Promise.all(reg), ot: await Promise.all(ot)
      })

    })
  })
});

router.get('/lvpeiUsers', passport.authenticate('super_admin', { session: false }), (req, res) => {
  User.find({role: 'lvpei',access: true}).then(users => {
    console.log(users)
    res.json(users)
  })
});

router.get('/getReports', passport.authenticate('super_admin', {session: false}), (req, res) => {
  Music.find().then(music => {
    res.json(music)
  })
})

router.get('/downloadExcel',
  (req, res) => {
  let dummy=[]
    Music.find().then( async music => {
      let workbook = new excel.Workbook();
      workbook.creator = 'LVPEI';
      workbook.properties.date1904 = true;

      workbook.views = [
        {
          x: 0, y: 0, width: 10000, height: 20000,
          firstSheet: 0, activeTab: 1, visibility: 'visible'
        }
      ];
      let sheet = workbook.addWorksheet('UsageReport');
      sheet.columns = [
        { header: 'Category', key: 'name', width: 20 },
        { header: 'Book Title', key: 'name', width: 40 },
        { header: 'Language', key: 'name', width: 20},
        { header: 'Author', key: 'name', width: 20},
        { header: 'Tracks', key: 'id', width: 10},
        { header: 'Downloads', key: 'id', width: 10 },
        { header: 'Plays', key: 'id', width: 10 },
        { header: 'Favourites', key: 'id', width: 10 },
        { header: 'Rating', key: 'name', width: 10 },
        { header: 'People Rated', key: 'name', width: 15 },

      ];
      music.map(book => {
        dummy.push(new Promise((resolve, reject) =>{
          let length = book.rating.length*5
          let totalRatings = 0, rateDisplay=0, number=book.rating.length
          book.rating.map(single => {
            totalRatings= totalRatings + single.rate
          })
          if(isNaN((totalRatings/length)*5)) {
            rateDisplay=0
          }else {
            rateDisplay=(totalRatings/length)*5
          }
          // sheet.addRow({Category: book.category, title: book.title, tracks: book.tracks,downloads: book.downloads,
          //   plays: book.plays, favs: book.fav.length, rating: rateDisplay+'('+number+')'})
          sheet.addRow([book.category,book.title,book.language,book.author, book.tracks,book.downloads,
            book.plays, book.fav.length,rateDisplay+'/5 ',number])
        }))
      })
      await Promise.all([res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')])
      await Promise.all([res.setHeader("Content-Disposition", "attachment; filename=" + 'UsageReport.xlsx')])

      await Promise.all([workbook.xlsx.write(res).then(() => {
        res.end();
      })])
    })
})

router.get('/deAssignedUsers', passport.authenticate('super_admin', { session: false }), (req, res) => {
  User.find({role: 'lvpei',access: false}).then(users => {
    console.log(users)
    res.json(users)
  })
});

router.post('/removeLVPEIAccess',passport.authenticate('super_admin', {session: false}),
  (req, res) => {
    User.findOneAndUpdate({emailId: req.body.emailId},{access: false}).then(user => {
      res.json({success: true})
    }).catch(err => {
      console.log({error: err})
    })
  })

router.post('/grantLVPEIAccess',passport.authenticate('super_admin', {session: false}),
  (req, res) => {
    User.findOneAndUpdate({emailId: req.body.emailId},{access: true}).then(user => {
      res.json({success: true})
    }).catch(err => {
      console.log({error: err})
    })
  })

router.post('/resetPassword',passport.authenticate('super_admin', {session: false}),
  (req, res) => {
    const { errors, isValid } = validateResetPassword(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    User.findOne({emailId:req.body.emailId}).then(user => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
        if (err) throw err
        user.password = hash
        user.save().then(user => {
          console.log(user)
          res.json({ success: true })
        }).catch(err => {
          console.log(err)
          res.json({ error: 'creating the user' })
        })
      })
    })
  })
  })

module.exports = router