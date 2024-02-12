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

    public Optional<FolderEntity> getFolderByFolderName(String folderName) {
        log.info("Get folder : {}", folderName);
        return folderRepository.findFirstByFolderName(folderName);
    }

    public FolderEntity updateFolderName(FolderNameDTO data) {
        Long folderId = data.getFolderId();
        String newFolderName = data.getNewFolderName();

        Optional<FolderEntity> folder = folderRepository.findFirstByFolderId(folderId);
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