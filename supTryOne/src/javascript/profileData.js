import {writeKeyVal, readKeyVal} from './persist'

/*
 * these variables must persist
 */
var jsonTree1 = null;
var jsonTree2 = null;
var profileLoginStatus = false;

export const processLoginValid = (json) => {
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

export const processLoginValidExt = (json) => {
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

export const validateProfileData = (username, password) => {
  if (jsonTree1 == null) {
    console.log('jsonTree1 is null');
    resetLoggedin();
    return false;
  }
  if (jsonTree2 == null) {
    console.log('jsonTree2 is null');
    resetLoggedin();
    return false;
  }

  // sup:do add checks here
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

  setLoggedIn(username, password);
  return true;
};

const setLoggedIn = (username, password) => {
  profileLoginStatus = true;
  ret1 = writeKeyVal('user', username);
  ret2 = writeKeyVal('pass', password);
  ret3 = writeKeyVal('sign', profileLoginStatus.toString());
  if (ret1 && ret2 && ret3) {
    console.log("setLoggedIn: creds saved");
  } else {
    console.log("setLoggedIn: Failed");
    setLoggedOut(true);
  }
};

export const setLoggedOut = (nofs = false) => {
  jsonTree1 = null;
  jsonTree2 = null;
  profileLoginStatus = false;

  if (nofs) return;

  ret1 = writeKeyVal('user', null);
  ret2 = writeKeyVal('pass', null);
  ret3 = writeKeyVal('sign', profileLoginStatus.toString());

  if (ret1 && ret2 && ret3) {
    console.log("setLoggedOut: creds deleted");
  } else {
    console.log("setLoggedOut: Failed");
  }
};

export const getLoggedInLocal = () => {
  return profileLoginStatus;
};


export const getLoggedInRemote = () => {
  performRequestStatus(null);
};
