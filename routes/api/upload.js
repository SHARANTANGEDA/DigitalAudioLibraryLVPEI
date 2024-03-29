const getAge =require( '../../validations/ageValidation/getAge')
const categorizeAge = require('../../validations/ageValidation/categorizeAge')
const getQuarter = require('../../validations/ageValidation/getQuarter')

const Grid = require('gridfs-stream')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const archiver = require('archiver')
const db = require('../../config/keys').mongoURI
const mongoose = require('mongoose')
const User = require('../../mongoModels/User')
const Music = require('../../mongoModels/Music')
const validateBookInput = require('../../validations/bookUploadForm')
const sqlDB = require('../../models')

let gfs, dfs

const conn = mongoose.createConnection(db, { useNewUrlParser: true })
conn.once('open', () => {
  // Init stream
  console.log('MongoDB Connected in upload')
  gfs = Grid(conn.db, mongoose.mongo)
  dfs = Grid(conn.db, mongoose.mongo)
  gfs.collection('uploads')
  dfs.collection('display')
})
const storage = new GridFsStorage({
  url: require('../../config/keys').mongoURI,
  file: (req, file) => {

    return new Promise((resolve, reject) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        Music.findOneAndUpdate({ picTransit: true, uploadedBy: req.user.emailId, transit: false },
          { picture: true, picTransit: false }, { new: true }).then(music => {
          User.findOneAndUpdate({ emailId: req.user.emailId }, { $inc: { uploads: 1 } },
            { new: true }).then(user => {
            const filename = file.originalname
            const fileInfo = {
              filename: filename,
              metadata: {
                tracks: music.tracks,
                bookId: music._id.toString()
              },
              bucketName: 'display'
            }
            resolve(fileInfo)
          }).catch(err => {
            reject(err)
          })
        }).catch(err => {
          reject(err)
        })
      } else {
        Music.findByIdAndUpdate(req.params.id,
          { $inc: { tracks: 1 } }, { new: true }).then(music => {
          User.findOneAndUpdate({ emailId: req.user.emailId }, { $inc: { uploads: 1 } },
            { new: true }).then(user => {
            const filename = file.originalname
            const fileInfo = {
              filename: filename,
              metadata: {
                title: music.title,
                category: music.category,
                bookId: music._id.toString()
              },
              bucketName: 'uploads'
            }
            resolve(fileInfo)
          }).catch(err => {
            reject(err)
          })
        }).catch(err => {
          reject(err)
        })
      }

    })
  }
})

// const storageII = new GridFsStorage({
//   url: require('../../config/keys').mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       console.log({params: req.params.id, hello: file})
//         Music.findByIdAndUpdate(req.params.id,
//           { $inc:{ tracks: 1 }}, {new: true}).then(music => {
//           console.log({params: req.params.id, hello: music})
//           User.findOneAndUpdate({emailId: req.user.emailId},{$inc: {uploads: 1}},
//             { new: true }).then(user => {
//             const filename =file.originalname
//             const fileInfo = {
//               filename: filename,
//               metadata: {
//                 title: music.title,
//                 category: music.category,
//                 bookId: music._id.toString()
//               },
//               bucketName: 'uploads'
//             }
//             resolve(fileInfo)
//           }).catch(err => {
//             reject(err)
//           })
//         }).catch(err => {
//           reject(err)
//         })
//     })
// //   }
// })

const upload = multer({ storage })
// const upload2 = multer({storageII})

// @route POST /upload
// @desc  Uploads musicFiles to DB
router.post('/upload/:id', passport.authenticate('lvpei', { session: false }),
  upload.array('file'), (req, res) => {
    Music.findOneAndUpdate({ transit: true, uploadedBy: req.user.emailId },
      { transit: false, picTransit: true }).then(patient => {
        return res.json({ success: true })
    })
  })

// @route POST /upload
// @desc  Add musicFiles to DB
// router.post('/addTracks/:id', passport.authenticate('lvpei', { session: false }),
//   upload2.array('file'), (req, res) => {
//   console.log(req.params.id)
//   Music.findById(req.params.id).then(music => {
//     console.log(music)
//     return res.json({
//       success: true
//     })
//   })
//
//   })

router.get('/favourite/:id', passport.authenticate('world', { session: false }), (req, res) => {
  Music.findById(req.params.id).then(music => {
    music.fav.unshift({ id: req.user.id })
    music.save().then(user => {
      res.json({ success: true })
    })
  }).catch(err => {
    console.log(err)
  })
})

router.get('/unFavourite/:id', passport.authenticate('world', { session: false }), (req, res) => {
  Music.findById(req.params.id).then(music => {
    let index = music.fav.findIndex((item, i) => {
      return item.id === req.user.id
    })
    music.fav.splice(index, 1)
    music.save().then(user => {
      res.json({ success: true })
    })
  }).catch(err => {
    console.log(err)
  })
})

router.get('/addRating/:id/:rating', passport.authenticate('world', { session: false }), (req, res) => {
  Music.findById(req.params.id).then(music => {
    music.rating.unshift({ id: req.user.id, rate: req.params.rating })
    music.save().then(user => {
      res.json({ success: true })
    })
  }).catch(err => {
    console.log(err)
  })
})

router.get('/changeRating/:id/:rating', passport.authenticate('world', { session: false }), (req, res) => {
  Music.findById(req.params.id).then(music => {
    let index = music.rating.findIndex((item, i) => {
      return item.id === req.user.id
    })
    // console.log(index, music.rating[index])
    music.rating.splice(index, 1)
    music.rating.unshift({ id: req.user.id, rate: req.params.rating })
    music.save().then(user => {
      res.json({ success: true })
    })
  }).catch(err => {
    console.log(err)
  })
})

router.get('/displayImage/:id', (req, res) => {
  dfs.files.findOne({ 'metadata.bookId': req.params.id }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      })
    }
    const readstream = dfs.createReadStream(file.filename)
    readstream.pipe(res)
  })
})
router.get('/audio/:id/:filename', (req, res) => {
  gfs.files.findOne({ 'metadata.bookId': req.params.id, filename: req.params.filename }, (err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      })
    }
    const readstream = gfs.createReadStream(files.filename)
    // res.type('audio/mpeg')
    readstream.pipe(res)
  })
})
//Fill Upload form
router.post('/uploadForm', passport.authenticate('lvpei', { session: false }), (req, res) => {
  User.findById(req.user.id).then(user => {
    const { errors, isValid } = validateBookInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    const newUpload = new Music({
      category: req.body.category,
      title: req.body.title,
      author: req.body.author,
      language: req.body.language,
      grade: req.body.grade,
      organization: req.body.organization,
      uploadedBy: user.emailId,
      transit: true
    })
    newUpload.save().then(music => {
      res.json({ mid: music._id })
    }).catch(err => {
      console.log(err)
    })
  })
})
router.post('/onDiscard', passport.authenticate('lvpei', { session: false }), (req, res) => {
  Music.deleteOne({ _id: req.body.mid }).then(patient => {
    console.log({ 'Deleted User': req.body.mid })
  }).catch(err => {
    alert('There was an error in discarding')
  })
})

router.get('/folders/:id', (req, res) => {
  Music.findById(req.params.id).then(patient => {
    if(patient.access) {
      gfs.files.find({ 'metadata.bookId': req.params.id }).toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: 'No files exist'
          })
        } else {
          return res.json({ music: patient, files: files })
        }
      })
    }else {
      res.json({success: false})
    }
  }).catch(err => {
    console.log(err)
  })

})

router.get('/secureFolders/:id',passport.authenticate('all', { session: false }), (req, res) => {
  Music.findById(req.params.id).then(patient => {
    User.findById(req.user.id).then(user => {
      gfs.files.find({ 'metadata.bookId': req.params.id }).toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: 'No files exist'
          })
        } else {
          return res.json({ music: patient, files: files, user: user })
        }
      })
    })
    }).catch(err => {
      console.log(err)
    })
})


router.post('/uploadPicture', passport.authenticate('lvpei', { session: false }),
  upload.array('file'), (req, res) => {
    Music.findOneAndUpdate({ picTransit: true, uploadedBy: req.user.emailId, picture: false },
      { picTransit: false, picture: true }).then(patient => {
      return res.json({
        success: true
      })
    })
  })
// @route Download /files
// @desc  Download Single File
router.get('/downloadFile/:id', passport.authenticate('world', { session: false }), (req, res) => {
  gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      })
    }
    // create read stream
    User.findById(req.user.id).then(user => {
      let index = user.downloads.findIndex((item, i) => {
        return item.id === req.user.id
      })
      if(index!==-1) {
        user.downloads[index].times=user.downloads[index].times+1
      }else {
        let insert = {
          id: files._id,
          times:1
        }
        user.downloads.unshift(insert)
      }
    user.save().then(user => {
      Music.findByIdAndUpdate(files.metadata.bookId, { $inc: { downloads: 1 } }).then(music => {
        let age=getAge(user.dob)
        console.log(age)
        let ageCategory = categorizeAge(age)
        let today = new Date();
        let month = today.getMonth()
        let mStr
        if(month===1) {
          mStr='01 Jan'
        }
        if(month===2) {
          mStr='02 Feb'
        }
        if(month===3) {
          mStr='03 Mar'
        }
        if(month===4) {
          mStr='04 Apr'
        }
        if(month===5) {
          mStr='05 May'
        }
        if(month===6) {
          mStr='06 Jun'
        }
        if(month===7) {
          mStr='07 Jul'
        }
        if(month===8) {
          mStr='08 Aug'
        }
        if(month===9) {
          mStr='09 Sep'
        }
        if(month===10) {
          mStr='10 Oct'
        }
        if(month===11) {
          mStr='11 Nov'
        }
        if(month===12) {
          mStr='12 Dec'
        }
        let year = today.getFullYear()
        let quarter = getQuarter()
        sqlDB.pbi_dal_view.create({age:age,ageCategory:ageCategory,name:user.firstName+' '+user.lastName,
              gender: user.gender, qualification: user.qualification, address: user.address, pinCode: user.pinCode,
        city: user.city, state: user.state, country: user.country,
        status:'download', bookTitle: music.title,bookCategory: music.category, bookLanguage: music.language,
        bookAuthor: music.author, month:mStr, year: year, quarter: quarter}).then(sqlRow => {
          let readstream = gfs.createReadStream({
            filename: files.filename,
            root: 'uploads'
          })
          // set the proper content type
          res.set('Content-Type', files.contentType)
          res.set('Content-Disposition', 'attachment; filename="' + files.contentType + '"')
          // Return response
          readstream.pipe(res)
        })

      })
    })
    })
  })
})

// @route Download multiple files
// @desc  Download Complete Folder(ZIP)
router.post('/downloadSelected/:id', passport.authenticate('world', { session: false }), (req, res) => {
  // gfs.files.findOne({_id: req.params.id},(err, files) => {
  let arr = req.body.data
  gfs.files.find({ 'metadata.bookId': req.params.id }).toArray(async (err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      })
    }
    User.findById(req.user.id).then(user => {
      Music.findByIdAndUpdate(files[0].metadata.bookId, { $inc: { downloads: files.length } })
        .then(async music => {
          let age=getAge(user.dob)
          let ageCategory = categorizeAge(age)
          let today = new Date();
          let month = today.getMonth()
          let mStr
          if(month===1) {
            mStr='01 Jan'
          }
          if(month===2) {
            mStr='02 Feb'
          }
          if(month===3) {
            mStr='03 Mar'
          }
          if(month===4) {
            mStr='04 Apr'
          }
          if(month===5) {
            mStr='05 May'
          }
          if(month===6) {
            mStr='06 Jun'
          }
          if(month===7) {
            mStr='07 Jul'
          }
          if(month===8) {
            mStr='08 Aug'
          }
          if(month===9) {
            mStr='09 Sep'
          }
          if(month===10) {
            mStr='10 Oct'
          }
          if(month===11) {
            mStr='11 Nov'
          }
          if(month===12) {
            mStr='12 Dec'
          }
          let year = today.getFullYear()
          let quarter = getQuarter()
          sqlDB.pbi_dal_view.create({age:age,ageCategory:ageCategory,name:user.firstName+' '+user.lastName,
            gender: user.gender, qualification: user.qualification, address: user.address, pinCode: user.pinCode,
            city: user.city, state: user.state, country: user.country,
            status:'download', bookTitle: music.title,bookCategory: music.category, bookLanguage: music.language,
            bookAuthor: music.author, month:mStr, year: year, quarter: quarter}).then(async sqlRow => {
          let archive = archiver('zip')
          let dummy = []
          // archive.on('error', function (err) {
          //   throw err
          // })
          archive.pipe(res)
            files.forEach(file => {
              dummy.push(new Promise((resolve, reject) => {
                if (arr.includes(file._id.toString())) {
                  let readstream = gfs.createReadStream({
                    filename: file.filename,
                    root: 'uploads'
                  })
                  res.set('Content-Type', file.contentType)
                  res.set('Content-Disposition', 'attachment; filename="' + file.contentType + '"')
                  archive.append(readstream, { name: file.filename })
                  // resolve(readstream)
                }
              }).catch(err => {
                console.log({ err: 'New error has occurred' })
              }))
            })
            await Promise.all([archive.finalize()]).then(res => {
            }).catch(err => {
              console.log('error: ' + err)
            })
          })
        })
    })

  })
})

// @route Download multiple files
// @desc  Download Complete Folder(ZIP)
router.get('/downloadFolder/:id', passport.authenticate('world', { session: false }), (req, res) => {
  gfs.files.find({ 'metadata.bookId': req.params.id }).toArray(async (err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      })
    }
    User.findById(req.user.id).then(user => {

      Music.findByIdAndUpdate(files[0].metadata.bookId, { $inc: { downloads: files.length } })
        .then(async music => {
          let age=getAge(user.dob)
          let ageCategory = categorizeAge(age)
          let today = new Date();
          let month = today.getMonth()
          let mStr
          if(month===1) {
            mStr='01 Jan'
          }
          if(month===2) {
            mStr='02 Feb'
          }
          if(month===3) {
            mStr='03 Mar'
          }
          if(month===4) {
            mStr='04 Apr'
          }
          if(month===5) {
            mStr='05 May'
          }
          if(month===6) {
            mStr='06 Jun'
          }
          if(month===7) {
            mStr='07 Jul'
          }
          if(month===8) {
            mStr='08 Aug'
          }
          if(month===9) {
            mStr='09 Sep'
          }
          if(month===10) {
            mStr='10 Oct'
          }
          if(month===11) {
            mStr='11 Nov'
          }
          if(month===12) {
            mStr='12 Dec'
          }
          let year = today.getFullYear()
          let quarter = getQuarter()
          sqlDB.pbi_dal_view.create({age:age,ageCategory:ageCategory,name:user.firstName+' '+user.lastName,
            gender: user.gender, qualification: user.qualification, address: user.address, pinCode: user.pinCode,
            city: user.city, state: user.state, country: user.country,
            status:'download', bookTitle: music.title,bookCategory: music.category, bookLanguage: music.language,
            bookAuthor: music.author, month:mStr, year: year, quarter: quarter}).then(async sqlRow => {

            let archive = archiver('zip')
            let dummy = []
            // archive.on('error', function (err) {
            //   throw err
            // })
            archive.pipe(res)
            files.forEach(file => {
              dummy.push(new Promise((resolve, reject) => {
                let readstream = gfs.createReadStream({
                  filename: file.filename,
                  root: 'uploads'
                })
                res.set('Content-Type', file.contentType)
                res.set('Content-Disposition', 'attachment; filename="' + file.contentType + '"')
                archive.append(readstream, { name: file.filename })
                resolve(readstream)
              }).catch(err => {
                console.log(err)
                console.log({ err: 'New error has occurred' })
              }))
            })
            await Promise.all([archive.finalize()]).then(res => {
            }).catch(err => {
              console.log('error: ' + err)
            })
          })
        })
    })
  })
})
router.get('/viewBook/:id', passport.authenticate('world', { session: false }), (req, res) => {
  Music.findById(req.params.id).then(patients => {
    res.json({ mrNo: req.params.id, contents: patients })
  })
})

router.get('/removeAccess/:id', passport.authenticate('lvpei',{session: false}), (req, res) => {
  console.log(req.params.id)
  Music.findByIdAndUpdate(req.params.id,{access: false},{new:true}).then(music=> {
    console.log({here:music})
    res.json({success: true})
  }).catch(err=> {
    console.log(err)
    res.json({success: false})
  })
})
router.get('/grantAccess/:id', passport.authenticate('lvpei',{session: false}), (req, res) => {
  Music.findByIdAndUpdate(req.params.id,{access: true},{new:true}).then(music=> {
    console.log(music)
    res.json({success: true})
  }).catch(err=> {
    console.log(err)
    res.json({success: false})
  })
})

module.exports = router