package com.gi.giback.mysql.location.service;

import com.gi.giback.mysql.location.dto.BookmarkResponseDto;
import com.gi.giback.mysql.location.dto.LocationResponseDto;
import com.gi.giback.mysql.location.entity.LocationEntity;
import com.gi.giback.mysql.location.repository.LocationRepository;
import java.awt.print.Book;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class LocationService {
    //의존성 주입
    private final LocationRepository locationRepository;
    public LocationService(LocationRepository locationRepository){
        this.locationRepository = locationRepository;
    }


//  //로그인 한 유저가 저장하고 있는 전체 프로젝트 중 북마크 체크가 된 프로젝트들 조회(진행중)
//    public List<BookmarkResponseDto> bookmarkListByUserId(Long userId){
//        List<LocationEntity> locationList = locationRepository.locatinoListByUserId(userId);
//        List<BookmarkResponseDto> bookmarkList = new ArrayList<>();
//
//        if(locationList != null){
//            for(LocationEntity x : locationList){
//                //북마크가 되어있다면! 리스트만들고 return해야겠지
//                if(x.getBookmark()){
//                    BookmarkResponseDto bookmarkResponseDto = new BookmarkResponseDto();
//
//                    bookmarkResponseDto.setProjectId(x.getProjectId());
//                    //join해서 project아이디로 projectname 가져와야함.
//                    bookmarkResponseDto.setProjectName();
//                }
//            }
//        }
//    }


    //북마크 등록 및 해제 -> 수정
}
