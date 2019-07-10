const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusicSchema = new Schema({
  category: {
    type: String,
    required:true
  },
  title: {
    type: String,
  },
  tracks: {
    type: Number,
    default:0
  },
  author: {
    type: String
  },
  language: {
    type: String
  },
  grade: {
    type: String
  },
  // format: {
  //   type: Number,
  //   default: 0         //Redundant as all are MP3
  // },
  uploadAt: {
    type: Date,
    default: Date.now
  },
  organization: {
    type: String
  },
  transit: {
    type: Boolean,
    default: false
  },
  picTransit: {
    type: Boolean,
    default: true
  },
  picture: {
    type: Boolean,
    default: false
  },
  uploadedBy: {
    type: String
  },
  fav: [{ //World
    id: {
      type: String
    }
  }],
  downloads: {
    type: Number,
    default: 0
  },
  plays: {
    type: Number,
    default: 0
  },
  rating: [{
    id: {
      type: String,
    },
    rate: {
      type: Number
    }
  }]
});

module.exports = Music = mongoose.model('music',MusicSchema);

