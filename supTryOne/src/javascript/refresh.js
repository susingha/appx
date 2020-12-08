
var appRefresh_cb = null;

export const initAppRefresh = (cb) => {
    appRefresh_cb = cb;
}

export const appRefresh = () => {
    if (appRefresh_cb != null) {
        appRefresh_cb();
    } else {
        console.log('Cannot Refresh App. not initialized');
    }
}

