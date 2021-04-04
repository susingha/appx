import Urls from './urls';
import {xhrSend} from './network';
import {
  processJSONValid,
  processJSONValidExt,
  validateProfileData,
  setLoggedOut,
  getJSUser,
  getJSPass,
} from './profile';

/*
ctx
ctx.user
ctx.pass
ctx.succ_cb
ctx.fail_cb
*/

const processHTTPFailed = (ctx) => {
  console.log('processHTTPFailed: HTTP Req Failed');
  if (ctx.fail_cb) ctx.fail_cb();
  else setLoggedOut();
};

const processHTTPSuccess = (ctx) => {
  console.log(
    'processHTTPSuccess: HTTP Req Success ' + ctx.user + ' ' + ctx.pass,
  );
  if (validateProfileData(ctx.user, ctx.pass)) {
    if (ctx.succ_cb) ctx.succ_cb();
  } else {
    if (ctx.fail_cb) ctx.fail_cb();
  }
};

//////////////////////////////////////////////////////////////////////////////////// Status Page Save AutoDial
const handleStatusSaveAutoDialResponse = (res, ctx) => {
  // console.log('sup: response' + res);
  ctx.succ_cb(res);
};
const addStatusSaveAutoDialHeaders = (xhr, ctx) => {
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
};
const requestStatusSaveAutoDial = (ctx, json_head) => {
  var fdata =
    'fersure=1&mode=fields&fields=' +
    JSON.stringify(json_head).replace(/ /gi, '%20');
  xhrSend(
    Urls.statusPage,
    addStatusSaveAutoDialHeaders,
    handleStatusSaveAutoDialResponse,
    fdata,
    ctx,
  );
};

//////////////////////////////////////////////////////////////////////////////////// Status Page Save SpeedDial
const handleStatusSaveSpeedDialResponse = (res, ctx) => {
  // console.log('sup: response' + res);
  ctx.succ_cb(res);
};
const addStatusSaveSpeedDialHeaders = (xhr, ctx) => {
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
};
const requestStatusSaveSpeedDial = (ctx, json_head) => {
  var fdata =
    'fersure=1&mode=fields&fields=' +
    JSON.stringify(json_head).replace(/ /gi, '%20');
  xhrSend(
    Urls.statusPage,
    addStatusSaveSpeedDialHeaders,
    handleStatusSaveSpeedDialResponse,
    fdata,
    ctx,
  );
};

//////////////////////////////////////////////////////////////////////////////////// Status Ext Page
const handleStatusExtPageResponse = (res, ctx) => {
  if (processJSONValidExt(res)) {
    processHTTPSuccess(ctx);
  } else {
    console.log('Status JSON invalid Ext');
    processHTTPFailed(ctx);
  }
};
const requestStatusExtPage = (ctx) => {
  xhrSend(
    Urls.statusPage + '?mode=customer_status_ext&customer=' + ctx.user,
    null,
    handleStatusExtPageResponse,
    null,
    ctx,
  );
};

//////////////////////////////////////////////////////////////////////////////////// Status Page
const handleStatusPageResponse = (res, ctx) => {
  if (processJSONValid(res)) {
    requestStatusExtPage(ctx);
  } else {
    console.log('Status JSON invalid');
    processHTTPFailed(ctx);
  }
};
const requestStatusPage = (ctx) => {
  xhrSend(
    Urls.statusPage + '?mode=customer_status&customer=' + ctx.user,
    null,
    handleStatusPageResponse,
    null,
    ctx,
  );
};

//////////////////////////////////////////////////////////////////////////////////// Home Page
const requestHomePage = (ctx) => {};

//////////////////////////////////////////////////////////////////////////////////// WriteLog Page
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
const handleWritelogPageResponse = (res, ctx) => {
  // console.log('sup: handleWritelogPageResponse' + res);
  requestStatusPage(ctx);
};
const addWritelogPageHeaders = (xhr, ctx) => {};
const requestWritelogPage = (ctx) => {
  xhrSend(
    Urls.writelogPage,
    addWritelogPageHeaders,
    handleWritelogPageResponse,
    null,
    ctx,
  );
};

//////////////////////////////////////////////////////////////////////////////////// Login Page
const handleLoginPageResponse = (res, ctx) => {
  // console.log('sup: handleLoginPageResponse' + res);
  requestWritelogPage(ctx);
};
const addLoginPageHeaders = (xhr, ctx) => {
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
};
const requestLoginPage = (ctx) => {
  var fdata =
    'ConnectId=' + ctx.user + '&password=' + ctx.pass + '&FormButton=Login';
  xhrSend(
    Urls.loginPage,
    addLoginPageHeaders,
    handleLoginPageResponse,
    fdata,
    ctx,
  );
};

//////////////////////////////////////////////////////////////////////////////////// Default Page
const handleDefaultPageResponse = (res, ctx) => {
  requestLoginPage(ctx);
};
const requestDefaultPage = (ctx) => {
  xhrSend(Urls.defaultPage, null, handleDefaultPageResponse, null, ctx);
};

//////////////////////////////////////////////////////////////////////////////////// Example Page
const handleExamplePageResponse = (res, ctx) => {
  console.log('sup: example begin');
  console.log(res);
  console.log('sup: example end');
};
const requestExamplePage = (ctx) => {
  const xrls = [Urls.defaultPage, Urls.badPage];
  xhrSend(xrls[0], null, handleExamplePageResponse, null, ctx);
};

//////////////////////////////////////////////////////////////////////////////////// Browser Begin
export const performInternet = (ctx) => {
  console.log('sup: performInternet');
  requestExamplePage(null);
};

export const performLogin = (ctx) => {
  console.log('sup: performLogin');
  ctx.user = '3670769221'; // sup:loginfail
  ctx.user = '3670769222'; // sup:loginok
  ctx.pass = 'LEMIBLO';

  requestDefaultPage(ctx);
};

export const performLoginAuto = () => {
  console.log('sup: performLoginAuto');
  performLogin({
    user: getJSUser(),
    pass: getJSPass(),
    succ_cb: null,
    fail_cb: null,
  });
};

export const performRefresh = () => {
  console.log('sup: performRefresh');

  requestStatusPage({
    user: getJSUser(),
    pass: getJSPass(),
    succ_cb: null,
    fail_cb: performLoginAuto,
  });
};

export const performLogout = () => {
  console.log('sup: perform logout');
  setLoggedOut();
};

export const performSaveAutoDial = (json_head, handleResponse) => {
  console.log('sup: performSaveAutoDial');
  requestStatusSaveAutoDial(
    {
      user: getJSUser(),
      pass: getJSPass(),
      succ_cb: handleResponse,
      fail_cb: null,
    },
    json_head,
  );
};

export const performSaveSpeedDial = (json_head, handleResponse) => {
  console.log('sup: performSaveSpeedDial');
  requestStatusSaveSpeedDial(
    {
      user: getJSUser(),
      pass: getJSPass(),
      succ_cb: handleResponse,
      fail_cb: null,
    },
    json_head,
  );
};
