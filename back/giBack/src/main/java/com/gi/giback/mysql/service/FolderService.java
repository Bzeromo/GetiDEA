package com.gi.giback.mysql.service;

import com.gi.giback.dto.FolderDTO;
import com.gi.giback.dto.FolderNameDTO;
import com.gi.giback.mongo.service.ProjectService;
import com.gi.giback.mysql.entity.FolderEntity;
import com.gi.giback.mysql.entity.LocationEntity;
import com.gi.giback.mysql.repository.FolderRepository;
import java.util.List;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class FolderService {

    private final FolderRepository folderRepository;
    private final LocationService locationService;
    private final ProjectService projectService;

    @Autowired
    public FolderService(FolderRepository folderRepository, LocationService locationService,
        ProjectService projectService) {
        this.folderRepository = folderRepository;
        this.locationService = locationService;
        this.projectService = projectService;
    }

    public FolderEntity createFolder(FolderDTO data) {
        FolderEntity folder = new FolderEntity();

        folder.setUserEmail(data.getUserEmail());
        folder.setFolderName(data.getFolderName());

        log.info("Create folder : {}", folder.getFolderName());
        try {
            return folderRepository.save(folder);
        } catch (Exception e) {
            return null;
        }
    }

    public List<FolderEntity> getFoldersByUserEmail(String userEmail) {
        log.info("Get User's folder : {}", userEmail);
        return folderRepository.findByUserEmail(userEmail);
    }

    public void deleteFolder(Long folderId) {

        Optional<FolderEntity> entity = folderRepository.findFirstByFolderId(folderId);
        if(entity.isPresent()){
            FolderEntity folder = entity.get();
            String userEmail = folder.getUserEmail();
            String folderName = folder.getFolderName();

            List<LocationEntity> locationEntityList = locationService.getLocationsByUserEmailAndFolderName(userEmail, folderName);

            for (LocationEntity location : locationEntityList) {
                Long pid = location.getProjectId();

                locationService.deleteLocationByUserEmailAndProjectId(userEmail, pid);
                long count = locationService.countLocationsByProjectId(pid);

                if (count == 0) {
                    projectService.deleteProjectByProjectId(pid);
                }
            }
            log.info("Delete User's folder : {}", folderName);
            folderRepository.deleteByUserEmailAndFolderName(userEmail, folderName);
        }
    }

    public Optional<FolderEntity> getFolderByFolderName(String folderName) {
        log.info("Get folder : {}", folderName);
        return folderRepository.findFirstByFolderName(folderName);
    }

    public FolderEntity updateFolderName(FolderNameDTO data) {

        String userEmail = data.getUserEmail();
        Long folderId = data.getFolderId();
        String newFolderName = data.getNewFolderName();

        Optional<FolderEntity> folder = folderRepository.findFirstByUserEmailAndFolderId(userEmail, folderId);
        log.info("Update folder name : {}", newFolderName);
        if (folder.isPresent()) {
            FolderEntity entity = folder.get();
            entity.setFolderName(newFolderName);
            return folderRepository.save(entity);
        }
        return null; // or throw an exception
    }

    public boolean checkFolder(String userEmail, Long folderId) {
        Optional<FolderEntity> folder = folderRepository.findFirstByUserEmailAndFolderId(userEmail, folderId);
        return (folder.isPresent());
    }
}