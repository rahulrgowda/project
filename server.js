const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const CryptoJS = require("crypto-js");
const key = "bikeRidezPassword"

const User = require('./model/user.model');
const Location = require('./model/location.model');
const Booking = require('./model/bookingDetails.model');
const Bike = require('./model/bike.model');
const Feedback = require('./model/feedback.model');

const app = express();

app.use(express.json())

app.use(cors())

mongoose.connect('mongodb://0.0.0.0:27017/bikeRental')
  .then(() => console.log('Db connected...'))
  .catch(err => console.log(err))

//GET AND POST USER

app.post('/AddNewUser', async (req, res) => {
  const user = req.body;
  var encryptedData = CryptoJS.AES.encrypt(user.password, key).toString();
  user.password = encryptedData;
  try {
    const newData = new User(user);
    await newData.save();
    return res.json(await User.find())
  }
  catch (err) {
    console.log(err.message);
  }
});


app.get('/GetUsers', async (req, res) => {
  try {
    const allData = await User.find();
    return res.json(allData);
  }
  catch (err) {
    console.log(err.message)
  }
})

//Get single user
app.post('/GetUser', async (req, res) => {
  try {
    const user = req.body;
    const userData = await User.find({ emailId: user.emailId }, { name: 1, emailId: 1, password: 1 });
  
    if (userData.length != 0) {
      const decryptedData = CryptoJS.AES.decrypt(userData[0].password, key).toString(CryptoJS.enc.Utf8);

      if (user.password === decryptedData) {
        const matchedUser=await User.find({ emailId: user.emailId }, { name: 1, emailId: 1 });
        return res.json(matchedUser[0]);
      } 
      else {
        return res.send({ status: 'Password incorrect' })
      }

    } 
    else {
      return res.send({ status: 'User doesnot exist' });
    }

  }
  catch (err) {
    console.log(err.message)
  }
})




//GET, DELETE, EDIT AND POST BIKES
app.post('/AddNewBike', async (req, res) => {
  const bike = req.body;
  console.log(bike)
  try {
    const newData = new Bike(bike);
    await newData.save();
    return res.json(await Bike.find())
  }
  catch (err) {
    console.log(err.message);
  }
});

app.get('/GetBikes', async (req, res) => {
  try {
    const allData = await Bike.find();
    return res.json(allData);
  }
  catch (err) {
    console.log(err.message)
  }
})

app.delete('/DeleteBike', async (req, res) => {
  const obj = req.body;
  try {
    await Bike.deleteOne({ _id: obj._id });
    res.send({ success: true })
  }
  catch (err) {
    console.log(err);
    res.send({ success: false });
  }
})

app.put('/UpdateBike', async (req, res) => {
  const bike = req.body;
  try {
    await Bike.findOneAndUpdate({ _id: bike._id },
      {
        $set: {
          // brand: bike.brand,
          // name: bike.name,
          price: bike.price,
          locationTitle: bike.locationTitle,
          // imageUrl: bike.imageUrl
        }
      });
    res.send({ success: true })
  }
  catch (err) {
    console.log(err)
    res.send({ success: false })
  }
});

//GET LOCATIONS
app.get('/GetAllLocations', async (req, res) => {
  try {
    const allData = await Location.find();
    return res.json(allData);
  }
  catch (err) {
    console.log(err.message)
  }
})

//POST AND GET BOOKING DETAILS

app.post('/AddBookingDetail', async (req, res) => {
  const booking = req.body;
  try {
    const newData = new Booking(booking)
    await newData.save();
    return res.json(await Booking.find())
  }
  catch (err) {
    console.log(err.message)
  }
});

app.get('/GetBookings', async (req, res) => {
  try {
    const allData = await Booking.find();
    return res.json(allData);
  }
  catch (err) {
    console.log(err.message)
  }
})

//GET , DELETE AND POST FEEDBACK
app.post('/AddFeedback', async (req, res) => {
  const feedback = req.body;
  try {
    const newData = new Feedback(feedback);
    await newData.save();
    return res.json(await Feedback.find())
  }
  catch (err) {
    console.log(err.message);
  }
});

app.get('/GetFeedbacks', async (req, res) => {
  try {
    const allData = await Feedback.find();
    return res.json(allData);
  }
  catch (err) {
    console.log(err.message)
  }
});

app.delete('/DeleteFeedback', async (req, res) => {
  const obj = req.body;
  try {
    await Feedback.deleteOne({ _id: obj._id });
    res.send({ success: true })
  }
  catch (err) {
    console.log(err);
    res.send({ success: false });
  }
})



app.listen(8000, () => {
  console.log('Server Running...');
})