package com.gi.giback.mysql.repository;

import com.gi.giback.mysql.entity.FolderEntity;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FolderRepository extends JpaRepository<FolderEntity, String> {
    List<FolderEntity> findByUserEmail(String userEmail);
    @Transactional
    void deleteByUserEmailAndFolderName(String userEmail, String folderName);
    Optional<FolderEntity> findFirstByFolderName(String folderName);

    Optional<FolderEntity> findFirstByFolderId(Long folderId);

    Optional<FolderEntity> findFirstByUserEmailAndFolderId(String userEmail, Long folderId);

    Optional<FolderEntity> findFirstByUserEmailAndFolderName(String userEmail, String newFolderName);
}
