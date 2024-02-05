package com.gi.giback.mysql.service;

import com.gi.giback.mysql.entity.FolderEntity;
import com.gi.giback.mysql.repository.FolderRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FolderService {

    private final FolderRepository folderRepository;

    @Autowired
    public FolderService(FolderRepository folderRepository) {
        this.folderRepository = folderRepository;
    }

    public FolderEntity createFolder(FolderEntity folder) {
        return folderRepository.save(folder);
    }

    public List<FolderEntity> getFoldersByUserEmail(String userEmail) {
        return folderRepository.findByUserEmail(userEmail);
    }

    public void deleteFolder(String userEmail, String folderName) {
        folderRepository.deleteByUserEmailAndFolderName(userEmail, folderName);
    }

    public Optional<FolderEntity> getFolderByFolderName(String folderName) {
        return folderRepository.findFirstByFolderName(folderName);
    }

    public FolderEntity updateFolderName(String userEmail, String oldFolderName, String newFolderName) {
        Optional<FolderEntity> folder = folderRepository.findFirstByUserEmailAndFolderName(userEmail, oldFolderName);
        if (folder.isPresent()) {
            FolderEntity entity = folder.get();
            entity.setFolderName(newFolderName);
            return folderRepository.save(entity);
        }
        return null; // or throw an exception
    }
}