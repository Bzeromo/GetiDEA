package com.gi.giback.mysql.folder.repository;

import com.gi.giback.mysql.folder.entity.FolderEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FolderRepository extends JpaRepository<FolderEntity, Long> {
    //------------READ------------//
    FolderEntity findByUserId(Long userId);

    //유저의 id로 folder name 리스트 가져오기
    List<FolderEntity> getFolderList(Long userId);
    //------------CREATE------------//

    //------------UPDATE------------//

    //------------DELETE------------//
}
