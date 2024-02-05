package com.gi.giback.controller;

import com.gi.giback.mysql.dto.UserDto;
import com.gi.giback.mysql.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@Tag(name = "유저 컨트롤러 - 테스트 완료", description = "사용자 관련 컨트롤러")
@CrossOrigin
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userEmail}") // 이메일 값은 엑세스 토큰 디코딩 하면 페이로드에 있음
    @Operation(summary = "사용자 검색", description = "유저 초대시 사용자 검색")
    public List<UserDto> searchUsers(
            @PathVariable("userEmail") @Parameter(description = "검색할 사용자 id") String userEmail) {
        return userService.searchUsersByEmail(userEmail);
    }
}
