package com.gi.giback.mysql.test;

import lombok.Data;

@Data
public class UserTestResponseDto {
    private String message;
    public String getMessage() {return message;}
    public void setMessage(String message) {this.message = message;}

}
