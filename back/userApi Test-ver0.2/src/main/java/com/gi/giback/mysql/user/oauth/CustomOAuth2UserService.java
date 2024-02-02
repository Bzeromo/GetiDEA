package com.gi.giback.mysql.user.oauth;

import com.gi.giback.mysql.user.dto.UserModifyResponseDto;
import com.gi.giback.mysql.user.entity.UserEntity;
import com.gi.giback.mysql.user.repository.UserRepository;
import java.util.Optional;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    //의존성 주입
    private final UserRepository userRepository;
    public CustomOAuth2UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        //1. 유저 정보를 가져올거임.
        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println(oAuth2User.getAttributes()); //가져온 유저의 정보를 가져오기 위해 console에 찍어본다.

        //2. 유저 정보를 담을 바구니 선언
        //근데 어떤 플랫폼으로부터 데이터를 받을지 모름. 그러니까 일단 바구니 틀인 OAuth2Response 객체를 선언해두자.
        //그리고 가져온 데이터의 provider를 String type의 변수에 저장하자
        String providerName = userRequest.getClientRegistration().getRegistrationId();

        OAuth2Response oAuth2Response = null;

        //이제 어떤 플랫폼에서 들어온 데이터인지 확인해야겠다.
        //1.구글이면 구글에 해당하는 정보를 바구니에 담자.
        if (providerName.equals("google")) {
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());

        } else if (providerName.equals("naver")) {
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else {
            System.out.println("소셜로부터 가져온 정보가 이상합니다. Error!!");
            return null;
        }

        //이제 가져온 데이터의 provider에 따라서 저장을 진행하는 데이터의 바구니를 따로 설정해줬으니까 이제 바구니안에 데이터를 채우자.
        //일단 해당 유저가 기존에 있던 유저인지 아닌지 확인을 해야겠네.

        UserEntity exisData = userRepository.findByUserEmail(oAuth2Response.getEmail());

        System.out.println("email로 찾은 유저의 데이터가 있나???!!?!?!? exisData : " + exisData);

        //만약 DB에 저장되어있지 않다? 그러면 회원가입 자동으로 시켜주면서 로그인하자.
        if(exisData == null){
            //처음 로그인하는 유저라면 userEntity를 만들어줘야한다.
            UserEntity userEntity = new UserEntity();

            System.out.println("null이니까 회원가입 시킬거다!!");
            System.out.println(oAuth2Response);

            //userEntity에 response로 들어온 값을 채워주고
            userEntity.setUserName(oAuth2Response.getName());
            System.out.println(oAuth2Response.getName());

            userEntity.setUserEmail(oAuth2Response.getEmail());
            System.out.println(oAuth2Response.getEmail());

            userEntity.setProfileImage(oAuth2Response.getProfileImage());
            System.out.println(oAuth2Response.getProfileImage());

            userEntity.setProvider(oAuth2Response.getProvider());
            System.out.println(oAuth2Response.getProvider());

            System.out.println("회원가입 시키려는 유저의 정보입니다 <<UserEntity>> = " + userEntity);

            //DB에 저장하자

            System.out.println("userRepository :" + userRepository);

            userRepository.save(userEntity);

            System.out.println("유저 정보 저장을 완료했습니다.");
        }
        else{
            System.out.println("이미 로그인했던 유저입니다. 그대로 로그인을 진행합니다.");
        }

        return new CustomOAuth2User(oAuth2Response);
    }

    public UserEntity getUserById(Long userId){
        UserEntity userEntity = userRepository.findById(userId).get();

        return userEntity;
    }

    public UserEntity getUserByUserEmail(String userEmail){
        UserEntity userEntity = userRepository.findByUserEmail(userEmail);

        return userEntity;
    }

    //회원 이름 수정
    @Transactional
    public void updateUserName(Long userId, String name){
        System.out.println("회원의 이름 정보를 수정합니다");
        Optional<UserEntity> changeUser = userRepository.findById(userId);
        changeUser.ifPresent(value -> value.setUserName(name));
    }

    //회원 이미지 수정
    @Transactional
    public void updateUserImage(Long userId, String image){
        System.out.println("회원의 이미지 정보를 수정합니다.");
        Optional<UserEntity> changeUser = userRepository.findById(userId);
        changeUser.ifPresent(value -> value.setProfileImage(image));
    }

    //회원 정보 수정
    @Transactional
    public void updateUser(UserModifyResponseDto userModifyResponseDto){
        System.out.println("회원의 정보를 수정합니다");
        // 이메일을 기반으로 사용자를 찾습니다.
        UserEntity originUser = userRepository.findByUserEmail(userModifyResponseDto.getUserEmail());
        Long userId = originUser.getUserId();

        // userResponseDto로부터 업데이트할 정보를 가져옵니다.
        String updatedUserName = userModifyResponseDto.getUserName();
        String updatedProfileImage = userModifyResponseDto.getProfileImage();

        // 가져온 정보로 사용자 엔터티를 업데이트합니다.
        originUser.setUserName(updatedUserName);
        originUser.setProfileImage(updatedProfileImage);

        // 변경된 정보를 저장합니다.
        userRepository.save(originUser);
        System.out.println("회원의 정보를 수정했습니다.");
    }

}