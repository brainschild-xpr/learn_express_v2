require('dotenv').config()

const mongoose = require('mongoose');

const dbAuth = process.env.DB_auth
const dbUsers = process.env.DB_users
const mongoUri = process.env.DB_Uri
const db_auth_url = mongoUri + dbAuth
const db_user_url = mongoUri + dbUsers

mongoose.connect(db_user_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database_name:', dbUsers);
}).catch(() => {
  console.log('failed connected to database');
});