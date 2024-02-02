package com.gi.giback.mysql.location.repository;

import com.gi.giback.mysql.folder.entity.FolderEntity;
import com.gi.giback.mysql.location.dto.BookmarkResponseDto;
import com.gi.giback.mysql.location.dto.LocationResponseDto;
import com.gi.giback.mysql.location.entity.LocationEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<LocationEntity, String> {
    //------------READ------------//

    //userId로 location리스트 가져오기
    List<LocationEntity> locatinoListByUserId(Long userId);

    //userId로 북마크가 된 projectId와 projectName 가져오기

    //------------CREATE------------//

    //------------UPDATE------------//

    //------------DELETE------------//
}
