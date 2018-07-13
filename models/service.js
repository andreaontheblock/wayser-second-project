const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  name: String,
  category: Strin,
  //  solo pones [] pq es array
  favourites: [{
    type: ObjectId,
    // ref es el modelo comn  el que tiene relación.
    ref: 'Movies'
  }],
  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  }
});

userSchema.index({ location: '2dsphere' });
//
const User = mongoose.model('User', userSchema);

module.exports = User;

// teniendo los modelos hechos puedo empezar con las views.
