package com.pasifcode.caxias_diary.application.security;

public class AccessToken {
    public String accessToken;

    public AccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
