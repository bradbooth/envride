'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GOOGLE_MAPS_API_KEY_FRONTEND: process.env.GOOGLE_MAPS_API_KEY_FRONTEND
})
