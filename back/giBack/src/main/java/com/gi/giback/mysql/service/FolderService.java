package com.gi.giback.mysql.service;

import com.gi.giback.dto.FolderNameDTO;
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

    @Autowired
    public FolderService(FolderRepository folderRepository, LocationService locationService) {
        this.folderRepository = folderRepository;
        this.locationService = locationService;
    }

    public FolderEntity createFolder(String folderName, String userEmail) {
        FolderEntity folder = new FolderEntity();

        folder.setUserEmail(userEmail);
        folder.setFolderName(folderName);

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

            List<LocationEntity> locations = locationService.getLocationsByUserEmailAndFolderName(userEmail, folderName);

            for (LocationEntity location : locations) {
                Long pid = location.getProjectId();

                locationService.deleteLocationByUserEmailAndProjectId(userEmail, pid);
            }
            folderRepository.deleteByUserEmailAndFolderName(userEmail, folderName);
        }
    }

    public Optional<FolderEntity> getFolderByFolderName(String userEmail, String folderName) {
        log.info("Get folder : {}", folderName);
        return folderRepository.findFirstByUserEmailAndFolderName(userEmail, folderName);
    }

    public FolderEntity updateFolderName(FolderNameDTO data, String userEmail) {
        String newFolderName = data.getNewFolderName();

        Optional<FolderEntity> folderEntity = checkFolder(userEmail, data.getBeforeFolderName());
        if (folderEntity.isPresent()) {
            log.info("Update folder name : {}", newFolderName);
            FolderEntity entity = folderEntity.get();

            String beforeFolderName = entity.getFolderName();

            List<LocationEntity> locationEntities = locationService.getLocationsByUserEmailAndFolderName(userEmail, beforeFolderName);

            for (LocationEntity location : locationEntities) {
                location.setFolderName(newFolderName);
                locationService.saveLocation(location);
            }

            entity.setFolderName(newFolderName);
            return folderRepository.save(entity);
        }
        return null; // or throw an exception
    }

    public Optional<FolderEntity> checkFolder(String userEmail, String folderName) {
        return folderRepository.findFirstByUserEmailAndFolderName(userEmail, folderName);
    }

    public boolean checkDuplicateFolder(String userEmail, String newFolderName) {
        Optional<FolderEntity> folder = folderRepository.findFirstByUserEmailAndFolderName(userEmail, newFolderName);
        return (folder.isPresent());
    }
}