package com.test.oautionsession.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String mainPage(){
        //나중에 resources/templates 에 mustache view 템플릿을 만들어줄거임
        return "main";
    }
}
