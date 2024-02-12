package com.gi.giback.mysql.service;

import com.gi.giback.dto.LocationDTO;
import com.gi.giback.dto.LocationMoveDTO;
import com.gi.giback.mysql.entity.LocationEntity;
import com.gi.giback.mysql.repository.LocationRepository;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LocationService {
    private final LocationRepository locationRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public LocationEntity createLocation(String userEmail, Long projectId, String projectName, String FolderName) {
        log.info("Get folder : {}", userEmail);
        LocationEntity locationEntity = LocationEntity.builder()
                .userEmail(userEmail)
                .projectId(projectId)
                .projectName(projectName)
                .folderName(FolderName)
                .build();
        return locationRepository.save(locationEntity);
    }

    public List<LocationEntity> getLocationEntityByUserEmail(String userEmail) {
        return locationRepository.findByUserEmail(userEmail);
    }

    public LocationEntity updateFolderName(LocationMoveDTO data) {
        Optional<LocationEntity> entity = locationRepository.findFirstByUserEmailAndProjectId(
            data.getUserEmail(), data.getProjectId());
        if (entity.isPresent()) {
            LocationEntity location = entity.get();
            location.setFolderName(data.getNewFolderName());
            return locationRepository.save(location);
        }
        return null;
    }

    public LocationEntity toggleBookmark(LocationDTO data) {
        List<LocationEntity> entities = locationRepository.findByUserEmail(data.getUserEmail());
        for (LocationEntity entity : entities) {
            if (entity.getProjectId().equals(data.getProjectId())) {
                entity.setBookmark(!entity.getBookmark());
                return locationRepository.save(entity);
            }
        }
        return null;
    }

    public List<LocationEntity> getBookmarkedLocations(String userEmail) {
        return locationRepository.findByUserEmailAndBookmarkTrue(userEmail);
    }

    public Optional<LocationEntity> getLocationByUserEmailAndFolderName(String userEmail, String folderName) {
        return locationRepository.findFirstByUserEmailAndFolderName(userEmail, folderName);
    }

    public List<LocationEntity> getLocationsByUserEmailAndFolderName(String userEmail, String folderName) {
        return locationRepository.findByUserEmailAndFolderName(userEmail, folderName);
    }

    public Optional<LocationEntity> getLocationByProjectIdAndUserEmail(Long projectId, String userEmail) {
        return locationRepository.findByProjectIdAndUserEmail(projectId, userEmail);
    }

    public Optional<LocationEntity> getLocationByProjectNameAndUserEmail(String projectName, String userEmail) {
        return locationRepository.findByProjectNameAndUserEmail(projectName, userEmail);
    }

    public void deleteLocationByUserEmailAndProjectId(String userEmail, Long projectId) {
        locationRepository.deleteByUserEmailAndProjectId(userEmail, projectId);
    }

    public long countLocationsByProjectId(Long projectId) {
        return locationRepository.countByProjectId(projectId);
    }

    public LocationEntity updateProjectName(Long projectId, String newProjectName) {
        LocationEntity location = locationRepository.findByProjectId(projectId)
            .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));

        location.setProjectName(newProjectName);
        return locationRepository.save(location);
    }
}
