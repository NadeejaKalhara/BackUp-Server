const express = require('express')
var CryptoJS = require("crypto-js");
const path = require('path')
const request = require('request');
var bodyParser = require('body-parser');
const axios = require('axios')

const fs = require('fs');
var cors = require('cors');
const { json } = require('express');
var firebase = require("firebase-admin");
const { base64encode, base64decode } = require('nodejs-base64');
var serviceAccount = require(__dirname+"/private/cre.json");
var serviceAccountd = require(__dirname+"/private/st.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://aduruthuma-lms-default-rtdb.asia-southeast1.firebasedatabase.app"
});

var st = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccountd),
  databaseURL: "https://aduruthuma-default-rtdb.asia-southeast1.firebasedatabase.app/"
}, 'secondary');
const BOT_TOKEN = '5403190293:AAEHtiIEaSVESqcIrRmN202eOm5niqZ5_hA'
const CHAT_ID = -1001682122944 //
const tmMsg = (text) => {
  const options = {
    method: 'POST',
    url: `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID,parse_mode:"HTML", text })
  };
  request(options, function (error, response) {
    if (!error) //throw new Error(error);
      console.log(response.body);
    else console.log(error);
  });
};
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());
var port = process.env.PORT || 5000;
app.get('/', (req, res) => {res.send("started")})
app.get('/st', (req, res) => {
  const log = (text) => {
    console.log(text)
    fs.writeFile( "st"+new Date().toISOString().slice(0, 10)+".txt", JSON.stringify(text), function (err) {
      if (err) return console.log(err);
    });
 res.send("Done")
 const FormData = require('form-data');

const axiosImage = async(CHAT_ID, caption) => {
    try {

        const formData = new FormData();

        formData.append('chat_id', CHAT_ID);
        formData.append('document', fs.createReadStream(__dirname+"/st"+new Date().toISOString().slice(0, 10)+".txt"));
        formData.append('caption', ` ✅ Student Server Back Up on ${new Date().toISOString().slice(0, 10)}`);
    
        const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, formData, {
            headers: {     'Content-Type': 'multipart/form-data'}
            
        });

    } catch (err) {
        console.log(err);
    }
}
axiosImage(CHAT_ID,"Test")

  };
function abc(){
  fs.unlinkSync(__dirname+"/st"+new Date().toISOString().slice(0, 10)+".txt")
}
setTimeout(abc,10000)
  const dbRefObject = st.database().ref().child("/");
// Sync object changes
dbRefObject.once('value', get => log(get.val())); 
})



// start the server
app.listen(port);

console.log('Server started! At http://localhost:' + port);



