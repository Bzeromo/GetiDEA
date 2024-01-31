package com.gi.giback.mysql.dto;

public interface OAuth2Response {
    //OAuth를 통해 플랫폼으로부터 정보를 가져왔을 때 어떤 데이터를 구체적으로 사용할 것인지에 대한 인터페이스
    //각각의 플랫폼으로 부터 attribute에 들어오는 데이터의 타입이 다르기에 공통적으로 사용할 데이터를 가져오는 메소드에 대한 interface.

    //제공자(EX. naver, google...등등)
    String getProvider();

    //이메일
    String getEmail();

    //이름
    String getName();

    //프로필 이미지
    String getProfileImage();
}
