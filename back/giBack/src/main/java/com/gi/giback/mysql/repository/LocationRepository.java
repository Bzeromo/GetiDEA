package com.gi.giback.mysql.repository;

import com.gi.giback.mysql.entity.LocationEntity;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<LocationEntity, String> {
    Optional<LocationEntity> findByProjectId(Long projectId);
    List<LocationEntity> findByUserEmailAndBookmarkTrue(String userEmail);
    List<LocationEntity> findByUserEmail(String userEmail);
    Optional<LocationEntity> findFirstByUserEmailAndFolderName(String userEmail, String folderName);
    List<LocationEntity> findByUserEmailAndFolderName(String userEmail, String folderName);
    Optional<LocationEntity> findByProjectIdAndUserEmail(Long projectId, String userEmail);

    @Transactional
    void deleteByUserEmailAndProjectId(String userEmail, Long projectId);

    long countByProjectId(Long projectId);

    Optional<LocationEntity> findByProjectNameAndUserEmail(String projectName, String userEmail);

    Optional<LocationEntity> findFirstByUserEmailAndProjectId(String userEmail, Long projectId);
}
