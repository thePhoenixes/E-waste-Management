import mongoose from 'mongoose';

//for user
const empSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
   
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  }
});

export const empCollection = mongoose.model('empcollection', empSchema);







//For facillity collection centres

const faciSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
   
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  }
});

export const faciCollection = mongoose.model('facicollection', faciSchema);



//For Delivery partner

const delSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
   
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  }
});

export const delCollection = mongoose.model('delcollection', delSchema);



const feedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
   
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
   
});

export const feedCollection = mongoose.model('feedcollection', feedSchema);


// In model.js
// const facilityCentersSchema = new mongoose.Schema({
//   // Define your schema fields here
//   // For example, latitude and longitude fields
//   latitude: { type: Number, required: true },
//   longitude: { type: Number, required: true },
//   // Other fields as needed
// });

// const FacilityCenters = mongoose.model("FacilityCenters", facilityCentersSchema);

// export { FacilityCenters };