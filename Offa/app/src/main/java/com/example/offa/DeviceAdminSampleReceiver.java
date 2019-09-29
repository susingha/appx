package com.openxq.offa;

import android.app.admin.DeviceAdminReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

/**
 * Created by supsingh on 2/27/2017.
 */

public class DeviceAdminSampleReceiver extends DeviceAdminReceiver {

    private static final String TAG = String.valueOf(R.string.app_name);

    void showToast(Context context, String status_msg) {
        String status_log = context.getString(R.string.admin_receiver_status, status_msg);
        String status_tst = context.getString(R.string.app_name) + ": " + status_log;
        Toast.makeText(context, status_tst, Toast.LENGTH_SHORT).show();
        Log.i(TAG, status_log);
    }

    @Override
    public void onEnabled(Context context, Intent intent) {
        showToast(context, context.getString(R.string.admin_receiver_status_enabled));
    }

    @Override
    public void onDisabled(Context context, Intent intent) {
        showToast(context, context.getString(R.string.admin_receiver_status_disabled));
    }
}
