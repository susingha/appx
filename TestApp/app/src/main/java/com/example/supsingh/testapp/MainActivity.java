package com.example.supsingh.testapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.content.Context;

import com.example.supsingh.testapp.NetworkModels.BrowserAction;

public class MainActivity extends AppCompatActivity {

    public BrowserAction browserOne;
    public final boolean validateInput = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        browserOne = new BrowserAction(getApplicationContext());

    }

    public void onClickLogin(View v) {
        GlobalObjects.retcode ret = GlobalObjects.retcode.OK_SUCCESS;
        GlobalObjects.actioncode action = GlobalObjects.actioncode.ACTION_CONTINUE;

        Log.v(GlobalObjects.TAG, "Sending request");

        // TODO: Remove after Create UI
        String Username = "3670769222";
        String Password = "LEMIBLO";

        if (validateInput) {

            ret = GlobalObjects.UserAccount.validateUsername();
            if (ret != GlobalObjects.retcode.OK_SUCCESS) {
                action = GlobalObjects.actioncode.ACTION_SKIP_LOGIN;
            }

            ret = GlobalObjects.UserAccount.validatePassword();
            if (ret != GlobalObjects.retcode.OK_SUCCESS) {
                action = GlobalObjects.actioncode.ACTION_SKIP_LOGIN;
            }

            if (action == GlobalObjects.actioncode.ACTION_SKIP_LOGIN) {
                handleInputValidationError();
                return;
            }
        }

        browserOne.login(Username, Password);
    }


    public void handleInputValidationError () {
        // TODO: send some dialog box with the error message
    }
}