package com.gi.giback.s3.dto;


import lombok.Data;

@Data
public class FileUploadResponse { //DTO와 같은 역할
    String fileName;
    String url;
}
