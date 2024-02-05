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

    public LocationEntity createLocation(String userEmail, String projectId) {
        LocationEntity locationEntity = LocationEntity.builder()
                .userEmail(userEmail)
                .projectId(projectId)
                .build();
        return locationRepository.save(locationEntity);
    }

    public List<LocationEntity> getLocationEntityByUserEmail(String userEmail) {
        return locationRepository.findByUserEmail(userEmail);
    }

    public LocationEntity updateFolderName(String userEmail, String projectId, String newFolderName) {
        List<LocationEntity> entities = locationRepository.findByUserEmail(userEmail);
        for (LocationEntity entity : entities) {
            if (entity.getProjectId().equals(projectId)) {
                entity.setFolderName(newFolderName);
                return locationRepository.save(entity);
            }
        }
        return null;
    }

    public LocationEntity toggleBookmark(String userEmail, String projectId) {
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

    public List<LocationEntity> getLocationsByUserEmailAndFolderName(String userEmail, String folderName) {
        return locationRepository.findByUserEmailAndFolderName(userEmail, folderName);
    }

    public Optional<LocationEntity> getLocationByProjectIdAndUserEmail(String projectId, String userEmail) {
        return locationRepository.findByProjectIdAndUserEmail(projectId, userEmail);
    }

    public void deleteLocationByUserEmailAndProjectId(String userEmail, String projectId) {
        locationRepository.deleteByUserEmailAndProjectId(userEmail, projectId);
    }

    public long countLocationsByProjectId(String projectId) {
        return locationRepository.countByProjectId(projectId);
    }
}
