import Urls from '../javascript/urls';
import {xhrSend, sendReqWithFormData} from './network';

var usernameGlobal;
var passwordGlobal;

//////////// Status Ext Page ////////////////
const handleStatusExtPageResponse = res => {
  console.log('sup:2 response' + res);
  console.log('sup:3 done');
};
const requestStatusExtPage = () => {
  xhrSend(
    Urls.statusPage + '?mode=customer_status_ext&customer=' + usernameGlobal,
    null,
    handleStatusExtPageResponse,
    null,
  );
};

//////////// Status Page ////////////////
const handleStatusPageResponse = res => {
  console.log('sup:1 response' + res);
  requestStatusExtPage();
};
const requestStatusPage = () => {
  xhrSend(
    Urls.statusPage + '?mode=customer_status&customer=' + usernameGlobal,
    null,
    handleStatusPageResponse,
    null,
  );
};

//////////// Home Page ////////////////
const handleHomePageResponse = res => {
  requestStatusPage();
};

//////////// Login Page ////////////////
const handleLoginPageResponse = res => {
  handleHomePageResponse(res);
};
const addLoginPageHeaders = xhr => {
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
};
const requestLoginPage = () => {
  var fdata =
    'ConnectId=' +
    usernameGlobal +
    '&password=' +
    passwordGlobal +
    '&FormButton=Login';
  xhrSend(Urls.loginPage, addLoginPageHeaders, handleLoginPageResponse, fdata);
};

//////////// Default Page ////////////////
const handleDefaultPageResponse = res => {
  requestLoginPage();
};
const requestDefaultPage = () => {
  xhrSend(Urls.defaultPage, null, handleDefaultPageResponse, null);
};

//////////// Browser Begin ////////////////
export const performLogin = (usernameText, passwordText) => {
  usernameGlobal = usernameText;
  passwordGlobal = passwordText;
  usernameGlobal = '3670769222'; // sup:
  passwordGlobal = 'LEMIBLO';

  requestDefaultPage();
};
