require('dotenv').config()

const mongoose = require('mongoose');

const dbAuth = process.env.DB_auth
const mongoUri = process.env.DB_Uri
const db_auth_url = mongoUri + dbAuth

mongoose.connect(db_auth_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database_name:', dbAuth);
}).catch(() => {
  console.log('failed connected to database');
});