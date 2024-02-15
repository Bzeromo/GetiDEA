package com.gi.giback.controller;

import com.gi.giback.dto.UserDTO;
import com.gi.giback.mysql.service.UserService;
import com.gi.giback.response.ErrorResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping("/search") // 이메일 값은 엑세스 토큰 디코딩 하면 페이로드에 있음
    @Operation(summary = "사용자 검색 - 테스트 완료", description = "유저 초대시 사용자 검색")
    public List<UserDTO> searchUsers(
            @RequestParam @Parameter(description = "검색할 사용자 id") String userEmail) {
        return userService.searchUsersByEmail(userEmail);
    }

    @PatchMapping("/rename")
    @Operation(summary = "사용자 이름 변경 - 테스트 완료", description = "사용자 이름 변경")
    public ResponseEntity<?> renameUser(
        @RequestBody String newUserName, @AuthenticationPrincipal String userEmail) {

        if(userEmail == null || userEmail.equals("anonymousUser")){
            return ResponseEntity.badRequest().body(new ErrorResponse("사용자 검증 필요"));
        }

        Optional<UserDTO> updatedUser = userService.updateUserName(userEmail, newUserName);
        return updatedUser
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
