package com.gi.giback.mysql.user.oauth;

import com.gi.giback.mysql.user.dto.UserModifyResponseDto;
import com.gi.giback.mysql.user.dto.UserResponseDto;
import com.gi.giback.mysql.user.entity.UserEntity;
import com.gi.giback.mysql.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
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

    //프로필 이미지 수정하기
    @PatchMapping("/update/profileimage/userid={userid}")
    public ResponseEntity<UserResponseDto> updateUserImage(@PathVariable("userid") Long userId, String imageInfo){
        UserEntity origin = userRepository.getById(userId);
        System.out.println("수정하기 전의 유저 정보" + origin);
        customOAuth2UserService.updateUserImage(userId, imageInfo);

        UserResponseDto change = convertToDto(origin);
        System.out.println("수정한 이후의 유저 정보" + change);
        return ResponseEntity.ok(change);
    }

    //유저 이름 수정하기
    @PatchMapping("/update/name/userid={userid}")
    public ResponseEntity<UserResponseDto> updateUserName(@PathVariable("userid") Long userId, String name){
        UserEntity origin = userRepository.getById(userId);
        System.out.println("수정하기 전의 유저 정보" + origin);

        //서비스단에서 이름을 업데이트
        customOAuth2UserService.updateUserName(userId, name);

        UserResponseDto change = convertToDto(origin);
        System.out.println("수정한 이후의 유저 정보" + change);
        return ResponseEntity.ok(change);
    }

    //유저 정보 수정하기
    @PatchMapping("/update/userinfo")
    public void updateUser(@RequestBody UserModifyResponseDto userModifyResponseDto){
        UserEntity origin = userRepository.findByUserEmail(userModifyResponseDto.getUserEmail());
        System.out.println("수정하기 전의 유저 정보" + origin);

        //서비스단에서 정보를 업데이트
        customOAuth2UserService.updateUser(userModifyResponseDto);
    }

    //Entity를 DTO로 변환하는 메소드
    private UserResponseDto convertToDto(UserEntity userEntity) {
        UserResponseDto dto = new UserResponseDto();

        dto.setUserId(userEntity.getUserId());
        dto.setUserName(userEntity.getUserName());
        dto.setUserEmail(userEntity.getUserEmail());
        dto.setProfileImage(userEntity.getProfileImage());
        dto.setProvider(userEntity.getProvider());
        dto.setAccessToken(userEntity.getAccessToken());
        return dto;
    }

}
