package com.gi.giback.mysql.controller;

import com.gi.giback.mysql.dto.UserDto;
import com.gi.giback.mysql.entity.UserEntity;
import com.gi.giback.mysql.repository.UserRepository;
import com.gi.giback.mysql.service.CustomOAuth2UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "유저 컨트롤러", description = "유저 관련 API입니다.")
@RestController
@RequestMapping("/user")
@Slf4j
public class OAuth2Controller {

    private final CustomOAuth2UserService customOAuth2UserService;

    private final UserRepository userRepository;

    public OAuth2Controller(CustomOAuth2UserService customOAuth2UserService, UserRepository userRepository){
        this.customOAuth2UserService = customOAuth2UserService;
        this.userRepository = userRepository;
    }

    @GetMapping("/userid={id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long userId){

        UserEntity userEntity = customOAuth2UserService.getUserById(userId);

        if(userEntity != null){
            System.out.println(userEntity);
            return ResponseEntity.ok(userEntity);
        }
        else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User Empty");
        }
    }

    //email로 유저 조회
    @GetMapping("/useremail={userEmail}")
    public ResponseEntity<?> getUserByUserEmail(@PathVariable("userEmail") String userEmail){
        UserEntity findByUserEmail = customOAuth2UserService.getUserByUserEmail(userEmail);

        if(!findByUserEmail.getUserEmail().equals("null")){
            System.out.println(findByUserEmail);
            return ResponseEntity.ok(findByUserEmail);
        }
        else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No User registration by " + userEmail);
        }
    }


    //전체 유저 조회
    @GetMapping("/user/getalluser")
    public ResponseEntity<?> getAllUser(){
        List<UserEntity> userList = userRepository.findAll();

        if(userList != null){
            return ResponseEntity.ok(userList);
        }
        else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User is Empty");
        }
    }

    //이미지 수정하기
}
