package com.example.supsingh.testapp.NetworkModels;

import android.content.Context;
import android.util.Log;

import com.example.supsingh.testapp.GlobalObjects;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;

import cz.msebera.android.httpclient.Header;

/**
 * Created by supsingh on 6/24/17.
 */

public class BrowserAction {

    private NetworkHandler myNetworkHandler;


    public BrowserAction(Context context) {
        myNetworkHandler = NetworkHandler.getInstance(context);
    }


    private String createLoginRequest (String username, String password, String login_page) {
        String request_string = login_page;
        return request_string;
    }

    // send Username, Password and get cookie
    public void login (String Username, String Password) {

        String LoginPag1 = "https://services.indiald.com/eu/default.asp";
        String LoginPag2 = "http://httpbin.org/anything";
        String LoginPage = "http://httpbin.org/anything";
        String LoginRequest = createLoginRequest(Username, Password, LoginPage);
        myNetworkHandler.sendRequest(LoginRequest);
    }



    // fetches Name, Plan, Account number
    public void fetchDataPersonalInfo () {

    }

    public void logout () {

    }
}
