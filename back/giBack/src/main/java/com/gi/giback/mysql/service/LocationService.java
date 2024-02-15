package com.gi.giback.mysql.service;

import com.gi.giback.dto.LocationMoveDTO;
import com.gi.giback.dto.ProjectInfoDTO;
import com.gi.giback.mongo.service.ProjectService;
import com.gi.giback.mysql.entity.LocationEntity;
import com.gi.giback.mysql.repository.LocationRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class LocationService {
    private final LocationRepository locationRepository;
    private final ProjectService projectService;

    @Autowired
    public LocationService(LocationRepository locationRepository, @Lazy ProjectService projectService) {
        this.locationRepository = locationRepository;
        this.projectService = projectService;
    }

    public LocationEntity createLocation(String userEmail, Long projectId, String projectName, String folderName) {
        if(checkLocation(userEmail, projectId)) {
            return null;
        }

        LocationEntity locationEntity = LocationEntity.builder()
                .userEmail(userEmail)
                .projectId(projectId)
                .projectName(projectName)
                .folderName(folderName)
                .build();
        return locationRepository.save(locationEntity);
    }

    private boolean checkLocation(String userEmail, Long projectId) {
        return locationRepository.findByProjectIdAndUserEmail(projectId, userEmail).isPresent() ;
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

    public LocationEntity toggleBookmark(Long projectId, String userEmail) {
        List<LocationEntity> entities = locationRepository.findByUserEmail(userEmail);
        for (LocationEntity entity : entities) {
            if (entity.getProjectId().equals(projectId)) {
                entity.setBookmark(!entity.getBookmark());
                return locationRepository.save(entity);
            }
        }
        return null;
    }

    public List<ProjectInfoDTO> getBookmarkedLocations(String userEmail) {

        List<LocationEntity> bookmarkedLocations = locationRepository.findByUserEmailAndBookmarkTrue(userEmail);
        List<ProjectInfoDTO> projectInfoList = new ArrayList<>();

        for (LocationEntity locationEntity : bookmarkedLocations) {
            Long projectId = locationEntity.getProjectId();
            Optional<ProjectInfoDTO> projectEntity = projectService.getProjectInfo(projectId);
            if (projectEntity.isPresent()) {
                ProjectInfoDTO projectInfoDTO = projectEntity.get();
                projectInfoDTO.setBookmark(locationEntity.getBookmark());
                projectInfoList.add(projectInfoDTO);
            }
        }
        return projectInfoList;
    }

    public List<LocationEntity> getLocationsByUserEmailAndFolderName(String userEmail, String folderName) {

        return locationRepository.findByUserEmailAndFolderName(userEmail, folderName);
    }

    public Optional<LocationEntity> getLocationByProjectIdAndUserEmail(Long projectId, String userEmail) {
        return locationRepository.findByProjectIdAndUserEmail(projectId, userEmail);
    }

    public void deleteLocationByUserEmailAndProjectId(String userEmail, Long projectId) {
        locationRepository.deleteByUserEmailAndProjectId(userEmail, projectId);
        long count = countLocationsByProjectId(projectId);
        if (count == 0) {
            projectService.deleteProjectByProjectId(projectId);
        }
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

    public void saveLocation(LocationEntity location) {
        locationRepository.save(location);
    }
}
