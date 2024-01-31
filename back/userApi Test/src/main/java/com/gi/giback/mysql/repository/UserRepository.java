package com.gi.giback.mysql.repository;

import com.gi.giback.mysql.entity.UserEntity;
import java.util.List;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//UserEntity 통해 DB에 직접 접근할 파일 UserRepository
//이러한 것들을 모아둔 것이 repository package다
//@Repository는 기본적인 CRUD를 제공한다.
@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    //------------CREATE------------//


    //------------READ------------//

    //userEmail로 유저 조회
    UserEntity findByUserEmail(String userEmail);

    //전체 유저 조회 -> 관리자 기능
//    List<UserEntity> getAllUser();


    //------------UPDATE------------//

    //프로필 이미지 수정
//    void updateUserProfileImage(String profileImage);


    //유저 이름 수정
//    void updateUserName(String userName);


    //------------DELETE------------//

    //회원탈퇴 : 유저 id로 유저 찾은뒤에 삭제
//    void deleteUser(long userId);

}
