package com.example.supsingh.testapp;

import com.example.supsingh.testapp.DataModels.Account;

/**
 * Created by supsingh on 6/24/17.
 */

public class GlobalObjects {
    public static final String TAG = "sup: ";
    public static Account UserAccount;


    public enum retcode {
        OK_SUCCESS,
        E_NO_HTTPCLIENT,
        E_NO_MEMORY,
    }

    public enum actioncode {
        ACTION_CONTINUE,
        ACTION_SKIP,
        ACTION_SKIP_LOGIN,
        ACTION_SKIP_REQUEST,
        ACTION_RETURN,
        ACTION_RETURN_OK,
        ACTION_NOP,
    }
}
