package com.gi.giback.login.security.oauth2.user;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

  public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
    super(attributes);
  }

  @Override
  public String getId() {
    return (String) attributes.get("id");
  }

  @Override
  public String getName() {
    return (String) attributes.get("name");
  }

  @Override
  public String getEmail() {
    System.out.println((String) attributes.get("account_email"));
    return (String) attributes.get("account_email");
  }

  @Override
  public String getImageUrl() {
    if (attributes.containsKey("picture")) {
      Map<String, Object> pictureObj = (Map<String, Object>) attributes.get("picture");
      if (pictureObj.containsKey("data")) {
        Map<String, Object> dataObj = (Map<String, Object>) pictureObj.get("data");
        if (dataObj.containsKey("url")) {
          return (String) dataObj.get("url");
        }
      }
    }
    return null;
  }
}
