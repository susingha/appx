package com.example.supsingh.testapp.NetworkModels;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import com.example.supsingh.testapp.GlobalObjects;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.AsyncHttpResponseHandler;
import com.loopj.android.http.PersistentCookieStore;

import cz.msebera.android.httpclient.Header;

/**
 * Created by supsingh on 6/22/17.
 */

public class NetworkHandler extends Application {

    private static final String TAG = "sup: ";
    private Context mContext;

    private static NetworkHandler myNetworkHandler;
    private static AsyncHttpClient myHTTPClient;
    PersistentCookieStore myCookieStore;

    // Contructor
    private NetworkHandler (Context context) {

        mContext = context;

        // Create a new AsyncHttpClient
        myHTTPClient = new AsyncHttpClient();

        // Attach a Cookie Store
        myCookieStore = new PersistentCookieStore(mContext);
        myHTTPClient.setCookieStore(myCookieStore);
    }

    // Singleton GetInstance
    public static  NetworkHandler getInstance (Context context) {
        if (myNetworkHandler == null) {
            myNetworkHandler = new NetworkHandler(context);
        }
        return myNetworkHandler;
    }

    // Getter
    public AsyncHttpClient getClient () {
        if (myHTTPClient == null) {
            Log.v(GlobalObjects.TAG, "HTTP Client not found. Need to initialize Network Handler");
        }
        return myHTTPClient;
    }

    // Network Requests and Responses
    public GlobalObjects.retcode sendRequest (String requestString) {

        if (myHTTPClient == null) {
            Log.v(GlobalObjects.TAG, "HTTP Client not found. Need to initialize Network Handler");
            return GlobalObjects.retcode.E_NO_HTTPCLIENT;
        }

        myHTTPClient.get(requestString, new AsyncHttpResponseHandler() {
            @Override
            public void onSuccess(int statusCode, Header[] headers, byte[] responseBody) {
                String s = new String(responseBody);
                Log.v(GlobalObjects.TAG, "request successful. s = " + s);
                return;
            }

            @Override
            public void onFailure(int statusCode, Header[] headers, byte[] responseBody, Throwable error) {
                Log.v(GlobalObjects.TAG, "request failed");
            }
        });

        return GlobalObjects.retcode.OK_SUCCESS;
    }

}
