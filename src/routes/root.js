'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return reply.type("text/html").code(200).send("<h1>hello world! </h1>");
  })
}
