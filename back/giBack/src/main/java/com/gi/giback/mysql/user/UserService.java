package com.gi.giback.mysql.user;

import com.gi.giback.mysql.user.UserDto;
import com.gi.giback.mysql.user.UserEntity;
import com.gi.giback.mysql.user.UserRepository;
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
