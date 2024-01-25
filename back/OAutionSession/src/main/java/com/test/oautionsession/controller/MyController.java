package com.test.oautionsession.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {

    @GetMapping("/my")
    public String myPage(){

        //페이지를 응답할 mustache 페이지~
        return "my";
    }

}
