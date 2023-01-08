const { errorWrap } = require('../middleware');
const { createResponse } = require('.');
const axios = require("axios");
const User = require('../models/user');

module.exports = {
  create: errorWrap(async (req, res) => {
    let response = await User.create(req.body);
    const statusCode = 200;
    const responseBody = createResponse(
      statusCode,
      'Successfully saved user',
      response,
    );
    res.status(statusCode).json(responseBody);
    
  }),
  findUser: errorWrap(async (req, res) => {
    const response = await User.find(req.query);
    const statusCode = 200;
    const responseBody = createResponse(
      statusCode,
      'Successfully fetched user',
      response,
    );
    res.status(statusCode).json(responseBody);
  })
}
