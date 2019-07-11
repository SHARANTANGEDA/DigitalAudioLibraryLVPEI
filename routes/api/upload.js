
const Grid = require('gridfs-stream')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const archiver = require('archiver')
// ObjectId = require('mongodb').ObjectID;
//@MongoDB Atlas Connection
const db = require('../../config/keys').mongoURI
const mongoose = require('mongoose')
const User = require('../../mongoModels/User')
const Music = require('../../mongoModels/Music')
const validateBookInput = require('../../validations/bookUploadForm')
// const zipStream = require('zip-stream')

let gfs,dfs

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

      if(file.mimetype==='image/jpeg' || file.mimetype==='image/png' || file.mimetype==='image/jpg') {
        Music.findOneAndUpdate({ picTransit: true, uploadedBy: req.user.emailId, transit: false},
          {picture: true, picTransit: false}, { new: true }).then(music => {
          User.findOneAndUpdate({emailId: req.user.emailId},{$inc: {uploads: 1}},
            { new: true }).then(user => {
            const filename =file.originalname
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
      }else {
        Music.findByIdAndUpdate(req.params.id,
          { $inc:{ tracks: 1 }}, { new: true }).then(music => {
          User.findOneAndUpdate({emailId: req.user.emailId},{$inc: {uploads: 1}},
            { new: true }).then(user => {
            const filename =file.originalname
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
    Music.findOneAndUpdate({ transit: true,uploadedBy: req.user.emailId },
      { transit: false, picTransit: true}).then(patient => {
      return res.json({
        success: true
      })
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

router.get('/favourite/:id',passport.authenticate('world',{session: false}), (req, res) => {
  Music.findById(req.params.id).then(music => {
    music.fav.unshift({id:req.user.id})
    music.save().then(user => {
      res.json({success: true})
    })
  }).catch(err => {
    console.log(err)
  })
})

router.get('/unFavourite/:id',passport.authenticate('world',{session: false}), (req, res) => {
  Music.findById(req.params.id).then(music => {
    let index = music.fav.findIndex((item, i) => {
      return item.id===req.user.id
    })
    music.fav.splice(index,1)
    music.save().then(user => {
      res.json({success: true})
    })
  }).catch(err => {
    console.log(err)
  })
})

router.get('/addRating/:id/:rating',passport.authenticate('world',{session: false}), (req, res) => {
  Music.findById(req.params.id).then(music => {
    music.rating.unshift({id:req.user.id,rate: req.params.rating })
    music.save().then(user => {
      res.json({success: true})
    })
  }).catch(err => {
    console.log(err)
  })
})

router.get('/changeRating/:id/:rating',passport.authenticate('world',{session: false}), (req, res) => {
  Music.findById(req.params.id).then(music => {
    let index = music.rating.findIndex((item, i) => {
      return item.id=== req.user.id
    })
    console.log(index, music.rating[index])
    music.rating.splice(index,1)
    music.rating.unshift({id:req.user.id,rate: req.params.rating })
    console.log(music.rating)
    music.save().then(user => {
      console.log(music)
      res.json({success: true})
    })
  }).catch(err => {
    console.log(err)
  })
})

router.get('/displayImage/:id', (req, res) => {
  console.log(req.params.id)
  dfs.files.findOne({'metadata.bookId':req.params.id}, (err, file) => {
    console.log({file:file})
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
  console.log({_id:req.params.id})
  gfs.files.findOne({'metadata.bookId':req.params.id, filename: req.params.filename},(err, files) => {
    console.log(files)
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      })
    }
     const readstream = gfs.createReadStream(files.filename)
    // res.type('audio/mpeg')
    readstream.pipe(res)
  })
});
//Fill Upload form
router.post('/uploadForm',passport.authenticate('lvpei', {session: false}),(req, res) => {
  console.log(req.user.id)
  User.findById(req.user.id).then(user => {
    console.log(user)
    const {errors, isValid} = validateBookInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log(user)
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
router.post('/onDiscard',passport.authenticate('lvpei',{session: false}),(req, res) => {
  Music.deleteOne({_id: req.body.mid}).then(patient => {
    console.log({'Deleted User':req.body.mid});
  }).catch(err => {
    alert('There was an error in discarding')
  })
})

router.get('/folders/:id', (req, res) => {
  Music.findById(req.params.id).then(patient => {
    gfs.files.find({'metadata.bookId':req.params.id}).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        })
      } else {
        console.log(files)
        return res.json({ music: patient, files: files })
      }
    })
  }).catch(err => {
    console.log(err)
  })

})

router.post('/uploadPicture', passport.authenticate('lvpei', { session: false }),
  upload.array('file'), (req, res) => {
    Music.findOneAndUpdate({ picTransit: true,uploadedBy: req.user.emailId, picture: false },
      { picTransit: false, picture: true}).then(patient => {
      return res.json({
        success: true
      })
    })
  })
// @route Download /files
// @desc  Download Single File
router.get('/downloadFile/:id', passport.authenticate('world',{session: false}), (req, res) => {
  gfs.files.findOne({_id: req.params.id},(err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      })
    }
    // create read stream
    Music.findByIdAndUpdate(files.metadata.bookId,{$inc:{downloads: 1}}).then(music => {
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


// @route Download multiple files
// @desc  Download Complete Folder(ZIP)
router.get('/downloadFolder/:id', passport.authenticate('world',{session: false}), (req, res) => {
  gfs.files.find({'metadata.bookId': req.params.id}).toArray(async (err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      })
    }
    Music.findByIdAndUpdate(files[0].metadata.bookId, { $inc: { downloads: files.length } })
      .then(async music => {

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
router.get('/viewBook/:id', passport.authenticate('world', { session: false }), (req, res) => {
  Music.findById(req.params.id).then( patients => {
    res.json({mrNo: req.params.id, contents:patients})
  })
})

module.exports = router