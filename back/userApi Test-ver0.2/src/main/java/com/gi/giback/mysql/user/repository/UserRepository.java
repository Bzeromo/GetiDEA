package com.gi.giback.mysql.user.repository;

import com.gi.giback.mysql.user.entity.UserEntity;
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

    //------------UPDATE------------//

    //------------DELETE------------//

    //회원탈퇴 : 유저 id로 유저 찾은뒤에 삭제
//    void deleteUser(long userId);
}
