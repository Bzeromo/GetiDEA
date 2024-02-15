package com.gi.giback.response;

public class ErrorResponse {
    private String message;
    // 필요에 따라 추가 필드 정의

    public ErrorResponse(String message) {
        this.message = message;
    }

    // Getter와 Setter
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
