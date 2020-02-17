"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable camelcase */
_dotenv["default"].config();

var baseUrl = '';

if (process.env.NODE_ENV !== 'production') {
  baseUrl = process.env.SENDGRID_DEVELOPMENT__URL;
} else {
  baseUrl = process.env.SENDGRID_PRODUCTION__URL;
}

var Helper = {
  hashPassword: function hashPassword(password) {
    return _bcrypt["default"].hashSync(password, _bcrypt["default"].genSaltSync(8));
  },
  comparePassword: function comparePassword(hashPassword, password) {
    return _bcrypt["default"].compareSync(password, hashPassword);
  },
  isValidNumber: function isValidNumber(number) {
    return /^\d+$/.test(number);
  },
  generateToken: function generateToken(user_id, email, is_admin) {
    var token = _jsonwebtoken["default"].sign({
      user_id: user_id,
      email: email,
      is_admin: is_admin
    }, process.env.SECRET, {
      expiresIn: '7d'
    });

    return token;
  },
  emailSender: function emailSender(details) {
    var DOMAIN = 'mg.bus-connect.me';

    var mailgun = require('mailgun-js')({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: DOMAIN
    });

    var data = {
      from: 'admin@mg.bus-connect.me',
      to: details.email,
      subject: details.subject,
      html: details.html,
      'o:tracking': 'False'
    };
    return mailgun.messages().send(data, function (error, body) {
      if (error) {
        console.log(error);
      }
    });
  },
  generateAuthEmail: function generateAuthEmail(email, firstName, token) {
    var details = {
      email: email,
      subject: 'Email Verification - Bus-connect',
      html: "'<div style=\"width: 90%; margin: 5em auto;\n       box-shadow: 0 0 10px rgba(0,0,0,.9);\">\n        <div>\n          <div>\n            <div style=\"background-color: #2084ba; height: 3rem; width: 100%\">\n                <h2 style=\"text-align: center; color: white;\n                 padding-top: 10px;\">Bus-connect</h2>\n            </div>\n            <h4 style=\"text-align: center\">Hi! ".concat(firstName, "</h4>\n          </div>\n          <div style=\" padding: 0px 20px 20px 20px\">\n            <div>\n              <p>Please verify that your email is <strong>").concat(email, "</strong>\n               when you signed up.</p>\n              <p>Click on the button below to verify.</p>\n              <button style=\"color: white; background-color: #2084ba;\n               border: none; border-radius: 10px; text-align: center;\n                padding: 10px;\">\n                <a  href=\"").concat(baseUrl, "/api/v1/auth/verifyEmail?token=").concat(token, "\"\n                 style=\"text-decoration: none;\n                 color: white;\">Verify Account</a></button>\n            </div>\n            <div>\n              <h3 style=\"text-align: center\">Thank you</h3>\n              <h3 style=\"text-align: center\">\n              Please do not reply, this is an autogenerated email.</h3>\n            </div>\n          </div>\n        </div>\n      </div>")
    };
    return Helper.emailSender(details);
  }
};
var _default = Helper;
exports["default"] = _default;