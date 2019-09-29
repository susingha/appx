package com.openxq.offa;

import android.app.Activity;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import com.openxq.offa.DeviceAdminSampleReceiver;
import com.openxq.offa.R;

public class MainActivity extends AppCompatActivity {

    private static final boolean debug = false;
    private static final String TAG = "MainActivity";
    private static final int CODE_ADMIN_RIGHTS_PERMISSION = 1;

    DevicePolicyManager mDPM;
    ComponentName adminReceiver;
    Button requestButton;


    @Override
    protected void onResume() {
        Context context = MainActivity.this;
        drawButton(context);
        super.onResume();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Log.d(TAG, "sup: onCreate");
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Context context = MainActivity.this;

        if (initializeApp(context) == false) {
            return;
        }

        if (adminPermissionsAvailable()) {
            drawButton(context);
            turnScreenOffAndExit(context);
        } else {
            blurBackground(context);
            zoomLogo();
            return; // Homescreen shows up
        }
    }

    private boolean initializeApp(Context context) {
        Log.v(TAG, "Initializing");

        if (mDPM == null) {
            mDPM = (DevicePolicyManager) getSystemService(Context.DEVICE_POLICY_SERVICE);
        }

        if (adminReceiver == null) {
            adminReceiver = new ComponentName(context, DeviceAdminSampleReceiver.class);
        }

        if (requestButton == null) {
            requestButton = (Button) findViewById(R.id.btRequest);
        }

        if (mDPM != null && adminReceiver != null && requestButton != null) {
            return true;
        }

        return false;
    }

    public boolean adminPermissionsAvailable() {
        return mDPM.isAdminActive(adminReceiver);
    }


    public void turnScreenOffAndExit(Context context) {
        // first lock screen
        boolean ret = turnScreenOff(context);

        // schedule end of activity
        if (ret) {
            exitApp(context);
        }
    }

    public boolean turnScreenOff(Context context) {

        if (initializeApp(context) == false)
            return false;

        boolean admin = adminPermissionsAvailable();
        if (admin) {
            Log.i(TAG, "Lock screen");
            if (debug) {
                Toast.makeText(context, "Locked Phone", Toast.LENGTH_SHORT).show();
            } else {
                mDPM.lockNow();
            }

            return true;
        } else {
            Log.d(TAG, "Cannot lock screen. Admin permission not available");
            Toast.makeText(context, R.string.device_admin_not_enabled, Toast.LENGTH_SHORT).show();
            return false;
        }
    }

    // Button Press. Request Admin Rights
    public void onRequest(View v) {
        boolean admin = adminPermissionsAvailable();
        if (admin == false) {
            requestAdminRights(adminReceiver);
        } else {
            turnScreenOffAndExit(this);
        }
    }

    public void requestAdminRights(ComponentName adminReceiver) {
        Log.v(TAG, "Requesting admin rights");
        Intent intent = new Intent(DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN);
        intent.putExtra(DevicePolicyManager.EXTRA_DEVICE_ADMIN, adminReceiver);
        intent.putExtra(DevicePolicyManager.EXTRA_ADD_EXPLANATION, getString(R.string.click_on_activate));
        startActivityForResult(intent, CODE_ADMIN_RIGHTS_PERMISSION);
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        Context context = MainActivity.this;
        super.onActivityResult(requestCode, resultCode, data);
        if (CODE_ADMIN_RIGHTS_PERMISSION == requestCode) {
            if (resultCode == Activity.RESULT_OK) {
                Log.i(TAG, "Admin rights granted");
            } else {
                Log.d(TAG, "Admin rights DENIED");
            }
        }
        drawButton(context);
    }

    public void exitApp(Context context) {
        if (debug) return;
        Log.v(TAG, "Exit");
        final Activity activity = (Activity) context;

        // then provide feedback
        // ((Vibrator) getSystemService(Context.VIBRATOR_SERVICE)).vibrate(50);

        Thread t = new Thread() {
            public void run() {
                try {
                    sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                activity.finish();
            }
        };
        t.start();
    }

    public void drawButton(Context context) {
        if(adminPermissionsAvailable()) {
            requestButton.setText(R.string.lock_screen);
        } else {
            requestButton.setText(R.string.test_screen_lock);
        }
    }

    private void blurBackground(Context context) {
        if (debug) return;
/*
        RelativeLayout rootView = (RelativeLayout) findViewById(R.id.activity_main);
        Blurry.with(context)
                .radius(10)
                .sampling(8)
                .color(Color.argb(66, 255, 255, 0))
                .async()
                .onto(rootView);
*/
    }

    public void onClickLogo (View v) {
        Context context = MainActivity.this;
        if (adminPermissionsAvailable()) {
            drawButton(context);
            turnScreenOffAndExit(context);
        }
    }

    private void zoomLogo() {
        Log.d(TAG, "sup: onClickLogo");
        ImageView ivLogo = (ImageView) findViewById(R.id.ivLogo);
        Animation zoomin = AnimationUtils.loadAnimation(this, R.anim.zoom);
        ivLogo.setAnimation(zoomin);
        ivLogo.startAnimation(zoomin);
    }
}

