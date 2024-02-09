package com.gi.giback.mysql.service;

import com.gi.giback.mysql.entity.FolderEntity;
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

    @Autowired
    public FolderService(FolderRepository folderRepository) {
        this.folderRepository = folderRepository;
    }

    public FolderEntity createFolder(FolderEntity folder) {
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

    public void deleteFolder(String userEmail, String folderName) {
        log.info("Delete User's folder : {}", folderName);
        folderRepository.deleteByUserEmailAndFolderName(userEmail, folderName);
    }

    public Optional<FolderEntity> getFolderByFolderName(String folderName) {
        log.info("Get folder : {}", folderName);
        return folderRepository.findFirstByFolderName(folderName);
    }

    public FolderEntity updateFolderName(String userEmail, String oldFolderName, String newFolderName) {
        Optional<FolderEntity> folder = folderRepository.findFirstByUserEmailAndFolderName(userEmail, oldFolderName);
        log.info("Update folder name : {}", newFolderName);
        if (folder.isPresent()) {
            FolderEntity entity = folder.get();
            entity.setFolderName(newFolderName);
            return folderRepository.save(entity);
        }
        return null; // or throw an exception
    }

    public boolean checkFolder(String userEmail, String oldFolderName) {
        Optional<FolderEntity> folder = folderRepository.findFirstByUserEmailAndFolderName(userEmail, oldFolderName);
        return (folder.isPresent());
    }
}