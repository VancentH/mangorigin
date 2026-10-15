'use strict'
const fs = require('fs')
const path = require('path')

// Load variables from a local .env file (gitignored) so VUE_APP_API_SERVER_URL
// can be set per machine/deploy without editing tracked files.
// Copy .env.example to .env and fill in real values to use.
const envPath = path.resolve(__dirname, '../.env')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*?)\s*$/)
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '')
    }
  })
}

module.exports = {
  NODE_ENV: '"production"',
  VUE_APP_API_SERVER_URL: JSON.stringify(process.env.VUE_APP_API_SERVER_URL || 'http://localhost:8080/mangorigin'),
  VUE_APP_API_TIMEOUT: JSON.stringify(process.env.VUE_APP_API_TIMEOUT || '60000')
}
