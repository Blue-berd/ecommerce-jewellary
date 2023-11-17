"use strict";

const errorHandler = require("./errorHandler");
const { client, format } = require("../utils/twilio.js");

const generateOtp = async function () {
  // Generate a random OTP
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
};

const login = async function (req, reply) {
  try {
    const { mobile } = req.params;

    // Generate OTP
    const otp = await generateOtp();

    // Send OTP
    const text = `Your OTP for login verification is ${otp}. OTP is valid for 5 minutes.`;
    const message = format(mobile, text);
    client.messages.create(message);

    // Insert OTP into the database
    const insertOtp = "INSERT INTO otp (mobile_no, otp_value) VALUES (?, ?)";
    const [results] = await fastify.mysql.query(insertOtp, [mobile, otp]);

    console.log("User record inserted successfully!", results);

    return reply.code(200).send({ data: { otp, mobile }, status: 201 });
  } catch (err) {
    console.error(err);
    return reply
      .code(500)
      .send({
        data: { message: "Internal Server Error", error: err.message },
        status: 500,
      });
  }
};

const confirmOtp = async function (req, reply) {
  try {
    const { otp, mobile } = req.body;

    // Check if the OTP is valid
    const checkRecord =
      "SELECT mobile_no, otp_value FROM otp WHERE mobile_no = ? ORDER BY id DESC LIMIT 1";

    const [result] = await fastify.mysql.query(checkRecord, [mobile]);

    if (!result || result.length === 0 || result[0].otp_value !== otp) {
      return reply
        .code(200)
        .send({ data: { message: "Invalid OTP" }, status: 200 });
    }

    // Proceed with user insertion unconditionally
    const insertQuery =
      "INSERT INTO users (mobile_no) VALUES (?) ON DUPLICATE KEY UPDATE mobile_no = mobile_no";

    const [insertResult, insertErr] = await fastify.mysql.query(insertQuery, [
      mobile,
    ]);

    return reply.code(201).send({
      data: { message: "User login/signup successful", token: "" },
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return reply
      .code(500)
      .send({
        data: { message: "Internal Server Error", error: err.message },
        status: 500,
      });
  }
};

module.exports = {
  login,
  confirmOtp,
};
