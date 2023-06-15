const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  visitorType :{
    type: Boolean,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  timeIn: {
    type: String,
    required: true,
  },
  bdHost: {
    type: String,
    required: true,
  },
  sticker: {
    type: String,
    required: true,
  },
  tagNo: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;