package com.gi.giback.mysql.oauth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class LoginController {
    @GetMapping("/login/main")
    public String mainPage(){
        return "main";
    }

    @GetMapping("/login/mypage")
    public String myPage(){
        return "my";
    }

    @GetMapping("/logout")
    public String logout(){
        return "main";
    }
}
