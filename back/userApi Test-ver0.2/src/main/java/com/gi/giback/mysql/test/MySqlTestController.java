package com.gi.giback.mysql.test;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class MySqlTestController {

    @Autowired
    private MySqlTestService mySqlTestService;

    @PostMapping("/item")
    public UserTestResponseDto registerTest(@RequestBody MySqlTestDto test) {
        log.info("item {}", test);

        boolean flag = mySqlTestService.registerTest(test);
        UserTestResponseDto userTestResponseDto = new UserTestResponseDto();
        if (flag) {
            userTestResponseDto.setMessage("ok");
            return userTestResponseDto;
        }

        userTestResponseDto.setMessage("fail");
        return userTestResponseDto;
    }

    @GetMapping("/item/{id}")
    public UserTestResponseDto getTest(@PathVariable("id") String id) {
        log.info("id {}", id);
        MySqlTestDto mySqlTestDto;
        mySqlTestDto = mySqlTestService.getTestById(id);

        if (mySqlTestDto != null) {
            UserTestResponseDto userTestResponseDto = new UserTestResponseDto();
            userTestResponseDto.setMessage("ok");
            return userTestResponseDto;
        }

        UserTestResponseDto userTestResponseDto = new UserTestResponseDto();
        userTestResponseDto.setMessage("fail");
        return userTestResponseDto;
    }
}
