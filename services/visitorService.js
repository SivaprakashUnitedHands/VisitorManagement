const Visitor = require("../models/Visitor");
const { REST_API_STATUSCODE } = require("../constant/enums");
const en = require("../constant/en.json");
const enMessage = require("../constant/enMessage.json");

const createVisitor = async (req, res) => {
  try {
    const now = new Date();
    const {
      name,
      visitorType,
      company,
      contactNumber,
      vehicleNumber,
      bdHost,
      sticker,
      tagNo,
      purpose,
    } = req.body;
    const visitor = new Visitor({
      name,
      visitorType,
      company,
      contactNumber,
      vehicleNumber,
      bdHost,
      sticker,
      tagNo,
      purpose,
    });
    // const visitor = new Visitor({
    //   name: req.body.name,
    //   address: req.body.address,
    //   phone_no: req.body.phone_no,
    // });
    visitor.checkIn = now;
    visitor.createdAt = now;
    visitor.updatedAt = now;
    visitor.timeIn = `${now.getHours()}:${now.getMinutes()}`;
    const val = await visitor.save();
    return res.status(REST_API_STATUSCODE.created).send({
      statusCode: REST_API_STATUSCODE.created,
      message: enMessage.success,
      visitor: val,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(REST_API_STATUSCODE.internalServerError).send({
      statusCode: REST_API_STATUSCODE.internalServerError,
      message: enMessage.failure,
      error: error,
    });
  }
};

const getAllVisitor = async (req, res) => {
  try {
    const searchTerm = req.query.search;
    var visitors;
    if (searchTerm != null) {
      visitors = await Visitor.find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } }, 
          { company: { $regex: searchTerm, $options: "i" } }, 
          { contactNumber: { $regex: searchTerm, $options: "i" } }, 
        ],
      });
    } else {
      visitors = await Visitor.find();
    }
    return res.status(REST_API_STATUSCODE.ok).send({
      statusCode: REST_API_STATUSCODE.ok,
      message: enMessage.success,
      allVisitors: visitors,
    });
  } catch (error) {
    console.error("Error retrieving visitors:", error);
    res.status(REST_API_STATUSCODE.internalServerError).send({
      statusCode: REST_API_STATUSCODE.internalServerError,
      message: enMessage.failure,
      error: error,
    });
  }
};

const getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params._id);
    if (!visitor) {
      return res.status(REST_API_STATUSCODE.notFound).send({
        statusCode: REST_API_STATUSCODE.notFound,
        message: enMessage.failure,
        error: en.visitorNotFound,
      });
    }
    return res.status(REST_API_STATUSCODE.ok).send({
      statusCode: REST_API_STATUSCODE.ok,
      message: enMessage.success,
      visitor: visitor,
    });
  } catch (error) {
    console.error("Error retrieving visitor:", error);
    res.status(REST_API_STATUSCODE.internalServerError).send({
      statusCode: REST_API_STATUSCODE.internalServerError,
      message: enMessage.failure,
      error: error,
    });
  }
};

const updateVisitor = async (req, res) => {
  try {
    req.body.updatedAt = new Date();
    const visitor = await Visitor.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    if (!visitor) {
      return res.status(REST_API_STATUSCODE.notFound).send({
        statusCode: REST_API_STATUSCODE.notFound,
        message: enMessage.failure,
        error: en.visitorNotFound,
      });
    }
    return res.status(REST_API_STATUSCODE.created).send({
      statusCode: REST_API_STATUSCODE.created,
      message: enMessage.success,
      visitor: visitor,
    });
  } catch (error) {
    console.error("Error updating visitor:", error);
    res.status(REST_API_STATUSCODE.internalServerError).send({
      statusCode: REST_API_STATUSCODE.internalServerError,
      message: enMessage.failure,
      error: error,
    });
  }
};

const deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params._id);
    if (!visitor) {
      return res.status(REST_API_STATUSCODE.notFound).send({
        statusCode: REST_API_STATUSCODE.notFound,
        message: enMessage.failure,
        error: en.visitorNotFound,
      });
    }
    return res.status(REST_API_STATUSCODE.noContent).send({
      statusCode: REST_API_STATUSCODE.noContent,
      message: enMessage.success,
      deleteMessage: en.visitorDeleted,
    });
  } catch (error) {
    console.error("Error deleting visitor:", error);
    res.status(REST_API_STATUSCODE.internalServerError).send({
      statusCode: REST_API_STATUSCODE.internalServerError,
      message: enMessage.failure,
      error: error,
    });
  }
};

module.exports = {
  createVisitor,
  getAllVisitor,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
};
