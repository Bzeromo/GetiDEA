package com.gi.giback.mysql.service;

import com.gi.giback.mysql.entity.LocationEntity;
import com.gi.giback.mysql.repository.LocationRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationService {
    private final LocationRepository locationRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public LocationEntity createLocation(String userEmail, Long projectId, String projectName) {
        LocationEntity locationEntity = LocationEntity.builder()
                .userEmail(userEmail)
                .projectId(projectId)
                .projectName(projectName)
                .build();
        return locationRepository.save(locationEntity);
    }

    public List<LocationEntity> getLocationEntityByUserEmail(String userEmail) {
        return locationRepository.findByUserEmail(userEmail);
    }

    public LocationEntity updateFolderName(String userEmail, String  projectName, String newFolderName) {
        List<LocationEntity> entities = locationRepository.findByUserEmail(userEmail);
        for (LocationEntity entity : entities) {
            if (entity.getProjectName().equals(projectName)) {
                entity.setFolderName(newFolderName);
                return locationRepository.save(entity);
            }
        }
        return null;
    }

    public LocationEntity toggleBookmark(String userEmail, Long projectId) {
        List<LocationEntity> entities = locationRepository.findByUserEmail(userEmail);
        for (LocationEntity entity : entities) {
            if (entity.getProjectId().equals(projectId)) {
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
