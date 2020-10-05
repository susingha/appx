import Urls from '../javascript/urls';
import {xhrSend} from './network';
import {
  processLoginValid,
  processLoginValidExt,
  validateProfileData,
  getLoggedIn,
  setLoggedOut,
} from './profileData';

var usernameGlobal = null;
var passwordGlobal = null;
var responseCallback = null;

const processLoginFinal = () => {
  if (validateProfileData(usernameGlobal, passwordGlobal) && getLoggedIn()) {
    if (responseCallback !== null)
      responseCallback();
  } else {
    consol.log('processLoginFinal: final profile data validation failed');
  }
};

//////////// Status Ext Page ////////////////
const handleStatusExtPageResponse = (res) => {
  if (processLoginValidExt(res)) {
    processLoginFinal();
  } else {
    console.log('Login Failed Ext');
  }
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
const handleStatusPageResponse = (res) => {
  if (processLoginValid(res)) {
    requestStatusExtPage();
  } else {
    console.log('sup:2 Login Failed');
  }
};
const requestStatusPage = () => {
  xhrSend(
    Urls.statusPage + '?mode=customer_status&customer=' + usernameGlobal,
    null,
    handleStatusPageResponse,
    null,
  );
};

//////////// Home Page /////////////////
const requestHomePage = () => {};

//////////// WriteLog Page /////////////
/*
 * sup:todo
 * send the writelog request here:
 * if 302 redirects to home.asp then its a login success
 * if 302 redirects to dialog2.asp then its a login fail
 * thats the graceful way to determine a login fail / success
 * But the problem here is that the writelog page is responding with 200 and not 302
 * The login page also is responding 200 instead of 302.
 * In case of browser both the above pages responds 302. not in case of xhr in android. iphone untested.
 * try to add some of the headers to have the server respond 302
 */
const handleWritelogPageResponse = (res) => {
  // console.log('sup:1 response' + res);
  requestStatusPage();
};
const addWritelogPageHeaders = (xhr) => {};
const requestWritelogPage = () => {
  xhrSend(
    Urls.writelogPage,
    addWritelogPageHeaders,
    handleWritelogPageResponse,
    null,
  );
};

//////////// Login Page ////////////////
const handleLoginPageResponse = (res) => {
  // console.log('sup:0 response' + res);
  requestWritelogPage();
};
const addLoginPageHeaders = (xhr) => {
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
const handleDefaultPageResponse = (res) => {
  requestLoginPage();
};
const requestDefaultPage = () => {
  xhrSend(Urls.defaultPage, null, handleDefaultPageResponse, null);
};

//////////// Browser Begin ////////////////
export const performLogin = (usernameText, passwordText, cb) => {
  usernameGlobal = usernameText;
  passwordGlobal = passwordText;
  responseCallback = cb;
  console.log('sup: button press');
  usernameGlobal = '3670769221'; // sup:loginfail
  usernameGlobal = '3670769222'; // sup:loginok
  passwordGlobal = 'LEMIBLO';

  requestDefaultPage();
};

export const performRequestStatus = (cb) => {
  responseCallback = cb;
  requestStatusPage();
};

export const performLogout = (cb) => {
  console.log('sup: perform logout');
  setLoggedOut(false);
  cb();
};
