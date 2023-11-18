const errorHandler = require("./errorHandler");

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