package com.gi.giback.controller;

import com.gi.giback.dto.MySqlTestDto;
import com.gi.giback.dto.ResponseDto;
import com.gi.giback.entity.MySqlTestEntity;
import com.gi.giback.service.MySqlTestService;
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
    public ResponseDto registerTest(@RequestBody MySqlTestDto test) {
        log.info("item {}", test);

        boolean flag = mySqlTestService.registerTest(test);
        if (flag) {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setMessage("ok");
            return responseDto;
        }

        ResponseDto responseDto = new ResponseDto();
        responseDto.setMessage("fail");
        return responseDto;
    }

    @GetMapping("/item/{id}")
    public ResponseDto getTest(@PathVariable("id") String id) {
        log.info("id {}", id);
        MySqlTestDto mySqlTestDto;
        mySqlTestDto = mySqlTestService.getTestById(id);

        if (mySqlTestDto != null) {
            ResponseDto responseDto = new ResponseDto();
            responseDto.setMessage("ok");
            return responseDto;
        }

        ResponseDto responseDto = new ResponseDto();
        responseDto.setMessage("fail");
        return responseDto;
    }
}
