package com.gi.giback.mysql.test;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@Tag(name = "MySQL 테스트", description = "MySQL 테스트용 API")
public class MySqlTestController {

    @Autowired
    private MySqlTestService mySqlTestService;

    @PostMapping("/item")
    public ResponseDto registerTest(@RequestBody MySqlTestDto test) {
        log.info("item {}", test);

        boolean flag = mySqlTestService.registerTest(test);
        ResponseDto responseDto = new ResponseDto();
        if (flag) {
            responseDto.setMessage("ok");
            return responseDto;
        }

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
