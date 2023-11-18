const fp = require("fastify-plugin");

const secret = process.env.JWT_SECRET;
 // 2 hours in milliseconds

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@fastify/jwt"), {
    secret: secret,
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.decorate("generateToken", function (userData) {
    const issuedAt = Date.now(); // Current time in milliseconds
    const tokenExpiration = 2 * 60 * 60 * 1000;
    const expiration = issuedAt + tokenExpiration;

    const tokenPayload = {
      ...userData,
      iat: issuedAt,
      exp: expiration,
    };

    const token = fastify.jwt.sign(tokenPayload);
    return token;
  });
});
