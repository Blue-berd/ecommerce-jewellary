'use strict'
const  {login, confirmOtp }  = require("../../controllers/userController.js");


module.exports = async function (fastify, opts) {
    fastify.post('/login/:mobile', login);
    fastify.post('/confirmotp', confirmOtp);
};