const Linkedin = require('node-linkedin')('86a3ulakxvuvla', 'NNR83IO0t8K2tg07', 'http://localhost:8000/linkedin');
const scope = ['r_emailaddress', 'r_liteprofile', 'w_member_social'];
console.log(Linkedin.auth.authorize(scope));

const grant_code = "AQSuf0HJikfDUiKOLTm8rcO1I2tBmWCsLmzv-C8zV1vHGCv6Uv66QwqBvWgmB2sFyRk4azHHhDOgI-msrweNCvHPxxx40h6S6dWvw2HHfy0pNRI8KPH4WeZzTL7xGBialstRfdtpOs6FaZvaG4pQ_3kPT6WtMrFgCPw9E9O50WVALyEKYjPyHO2anp_tAA";

const state = "sZsDLNNbTEXONwHg";

Linkedin.auth.getAccessToken('', grant_code, state, (err, results) => {
    console.log(results);
});