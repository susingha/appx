import {appRefresh} from './refresh';
import {writeKeyVal, readKeyVal} from './persist';

/*
 * these variables must persist
 * these are read and loaded on firstLoad()
 */
var jsonTree1 = null;
var jsonTree2 = null;
var jsLoggedin = false;
var jsUser = null;
var jsPass = null;
var jsPage = 'main';

export const processJSONValid = (json) => {
  json = json.trim();
  json = json.slice(1, -2);

  try {
    jsonTree1 = JSON.parse(json);
  } catch (e) {
    return false;
  }

  if (jsonTree1 == null) {
    return false;
  }

  /*
  var jsonPretty = JSON.stringify(jsonTree1, null, 2);
  console.log(jsonPretty);
  */

  return true;
};

export const processJSONValidExt = (json) => {
  json = json.trim();
  json = json.slice(1, -2);

  try {
    jsonTree2 = JSON.parse(json);
  } catch (e) {
    return false;
  }

  if (jsonTree2 == null) {
    return false;
  
  }
  /*
  var jsonPretty = JSON.stringify(jsonTree2, null, 2);
  console.log(jsonPretty);
  */

  return true;
};

export const getAccountId = () => {
  console.error('sup: account id not available');
  return null;
};

export const getPinlessDials = () => {};
export const setPinlessDials = () => {};

export const getSpeedDials = () => {
  if (jsonTree2 == null) {
    console.error('getSpeedDials returning null');
    return null;
  }
  return jsonTree2.customer_record_ext[1];
};

export const setSpeedDials = (item, idx) => {
  if (jsonTree2 == null) {
    console.error('getSpeedDials jsonTree2 is null');
    return null;
  }
  jsonTree2.customer_record_ext[1][idx] = JSON.parse(JSON.stringify(item));

  if (validateProfileData(jsUser, jsPass) == false) return null;

  return jsonTree2.customer_record_ext[1];
};

export const getAutoDials = () => {
  if (jsonTree2 == null) {
    console.error('getAutoDials returning null');
    return null;
  }
  return jsonTree2.customer_record_ext[2];
};
export const setAutoDials = (item, idx) => {
  if (jsonTree2 == null) {
    console.error('getAutoDials jsonTree2 is null');
    return null;
  }
  jsonTree2.customer_record_ext[2][idx] = JSON.parse(JSON.stringify(item));

  if (validateProfileData(jsUser, jsPass) == false) return null;

  return jsonTree2.customer_record_ext[2];
};

export const getJSON1 = () => {
  return jsonTree1;
};
export const getJSON2 = () => {
  return jsonTree2;
};

export const validateProfileData = (username, password) => {
  if (jsonTree1 == null) {
    console.log('jsonTree1 is null');
    setLoggedOut();
    return false;
  }
  if (jsonTree2 == null) {
    console.log('jsonTree2 is null');
    setLoggedOut();
    return false;
  }

  // sup:do add JSON checks here
  console.log('================ sup:b ================');
  console.log(jsonTree1.request_id);
  console.log(jsonTree1.errors);
  console.log(jsonTree1.query);
  console.log(jsonTree1.mode);
  console.log(jsonTree1.disabled);
  console.log(jsonTree1.session);
  console.log(jsonTree1.customer);
  console.log(jsonTree1.customer_record.email);
  console.log(jsonTree1.customer_record.EMAIL);
  console.log(jsonTree1.customer_record.CUSTOMER_ID);
  console.log(jsonTree1.customer_record.CUSTOMER);
  console.log(jsonTree1.customer_record.FIRST_NAME);
  console.log(jsonTree1.customer_record.LAST_NAME);
  console.log(jsonTree1.customer_record.LOCAL_PHONE);
  console.log(jsonTree1.customer_record.cos);
  console.log('================ sup:m ================');
  console.log(jsonTree2.request_id);
  console.log(jsonTree2.debug);
  console.log(jsonTree2.homeboy);
  console.log(jsonTree2.customer_record_ext[2][0]);
  console.log('================ sup:e ================');

  if (jsonTree1.customer != username) {
    console.log(
      'username: ' +
        username +
        ' does not match customer id: ' +
        jsonTree1.customer,
    );
    setLoggedOut();
    return false;
  }

  // write into hd
  setLoggedIn(username, password); // async
  return true;
};

const writeProfileData = async (username, password, loginvar) => {
  var ret;

  ret = await writeKeyVal('json1', JSON.stringify(jsonTree1, null, 2));
  if (!ret) {
    console.log('App: writeProfileData: Failed json1');
    return false;
  }
  ret = await writeKeyVal('json2', JSON.stringify(jsonTree2, null, 2));
  if (!ret) {
    console.log('App: writeProfileData: Failed json2');
    return false;
  }
  ret = await writeKeyVal('user', username);
  if (!ret) {
    console.log('App: writeProfileData: Failed user');
    return false;
  }
  ret = await writeKeyVal('pass', password);
  if (!ret) {
    console.log('App: writeProfileData: Failed pass');
    return false;
  }
  ret = await writeKeyVal('sign', loginvar.toString());
  if (!ret) {
    console.log('App: writeProfileData: Failed sign');
    return false;
  }
  ret = await writeKeyVal('page', jsPage);
  if (!ret) {
    console.log('App: writeProfileData: Failed page');
    return false;
  }

  jsLoggedin = loginvar;
  jsUser = username;
  jsPass = password;
  console.log('App: writeProfileData: creds saved');
  return true;
};

const readProfileData = async () => {
  var ret,
    sign = null;

  ret = await readKeyVal('json1');
  if (ret.succ == true) {
    jsonTree1 = JSON.parse(ret.val);
  } else {
    console.log('App: readProfileData: Failed json1');
    return false;
  }
  ret = await readKeyVal('json2');
  if (ret.succ == true) {
    jsonTree2 = JSON.parse(ret.val);
  } else {
    console.log('App: readProfileData: Failed json2');
    return false;
  }
  ret = await readKeyVal('user');
  if (ret.succ == true) {
    jsUser = ret.val;
  } else {
    console.log('App: readProfileData: Failed user');
    return false;
  }
  ret = await readKeyVal('pass');
  if (ret.succ == true) {
    jsPass = ret.val;
  } else {
    console.log('App: readProfileData: Failed pass');
    return false;
  }
  ret = await readKeyVal('sign');
  if (ret.succ == true) {
    sign = ret.val;
  } else {
    console.log('App: readProfileData: Failed sign');
    return false;
  }

  if (sign == true.toString()) jsLoggedin = true;
  else jsLoggedin = false;

  ret = await readKeyVal('page');
  if (ret.succ == true) {
    jsPage = ret.val;
  } else {
    console.log('App: readProfileData: Failed page');
    jsPage = 'main';
  }

  console.log('App: readProfileData: creds loaded');
  return true;
};

export const getJSUser = () => {
  return jsUser;
};
export const getJSPass = () => {
  return jsPass;
};
export const getJSLoggedin = () => {
  return jsLoggedin;
};
export const getJSPage = () => {
  return jsPage;
};
export const setJSPage = async (pagename) => {
  jsPage = pagename;
  var ret = await writeKeyVal('page', jsPage);
  if (!ret) {
    console.log('App: writeProfileData: Failed page');
    return false;
  }
};

export const loadProfile = async (refreshApp_cb) => {
  var ret = await readProfileData();
  appRefresh();
  return ret;
};

export const setLoggedIn = async (username, password) => {
  var ret = await writeProfileData(username, password, true);
  appRefresh();
  return ret;
};

export const setLoggedOut = async () => {
  jsonTree1 = null;
  jsonTree2 = null;
  jsLoggedin = false;
  jsUser = null;
  jsPass = null;
  jsPage = 'main';
  var ret = await writeProfileData('', '', false);
  appRefresh();
  return ret;
};
