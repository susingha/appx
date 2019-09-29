package com.codepath.simpletodo;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

/**
 * Created by supratik on 8/14/2016.
 */
public class SplashScreen extends Activity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.splash_screen);
        showSplashScreen(GlobalCommon.SPLASH_DISPLAY_LENGTH);
    }

    public void showSplashScreen(int length) {

        new Handler().postDelayed(new Runnable(){
            @Override
            public void run() {

                Intent i = new Intent(SplashScreen.this, MainActivity.class);
                SplashScreen.this.startActivity(i);
                SplashScreen.this.finish();
            }
        }, length);
    }
}
