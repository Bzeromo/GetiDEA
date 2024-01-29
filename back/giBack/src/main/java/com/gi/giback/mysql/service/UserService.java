package com.gi.giback.mysql.service;

import com.gi.giback.mysql.dto.UserDto;
import com.gi.giback.mysql.entity.UserEntity;
import com.gi.giback.mysql.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean registerUser(UserDto userDto) {
        UserEntity userEntity = new UserEntity();
        userEntity.setUserEmail(userDto.getUserEmail());
        userEntity.setUserName(userDto.getUserName());
        userEntity.setProfileImg(userDto.getProfileImg());
        userEntity.setProvider(userDto.getProvider());
        userEntity.setAccessToken(userDto.getAccessToken());

        userRepository.save(userEntity);

        return true;
    }
}
