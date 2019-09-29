package com.example.supsingh.testapp.DataModels;

import com.example.supsingh.testapp.GlobalObjects;

/**
 * Created by supsingh on 6/24/17.
 */

public class Account {
    private String Username;
    private String Password;
    private String AccountNumber;

    public String getUsername() {
        return Username;
    }

    public void setUsername(String username) {
        Username = username;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getAccountNumber() {
        return AccountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        AccountNumber = accountNumber;
    }

    public GlobalObjects.retcode validateUsername () {
        return GlobalObjects.retcode.OK_SUCCESS; // TODO:
    }

    public GlobalObjects.retcode validatePassword () {
        return GlobalObjects.retcode.OK_SUCCESS; // TODO:
    }
}
