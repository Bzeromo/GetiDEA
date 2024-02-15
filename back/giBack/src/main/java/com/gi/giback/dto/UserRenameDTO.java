package com.gi.giback.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRenameDTO {
    private String userEmail;
    private String newUserName;
}
