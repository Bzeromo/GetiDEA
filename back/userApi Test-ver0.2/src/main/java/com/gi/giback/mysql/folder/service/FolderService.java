//package com.gi.giback.mysql.folder.service;
//
//import com.gi.giback.mysql.folder.entity.FolderEntity;
//import com.gi.giback.mysql.repository.FolderRepository;
//import java.util.ArrayList;
//import java.util.List;
//import org.springframework.stereotype.Service;
//
//@Service
//public class FolderService{
//    //의존성 주입
//    private final FolderRepository folderRepository;
//    public FolderService(FolderRepository folderRepository){
//        this.folderRepository = folderRepository;
//    }
//
//    //------------READ------------//
//    public FolderEntity findByUserId(Long userId){
//        FolderEntity folderEntity = folderRepository.findByUserId(userId);
//        return folderEntity;
//    }
//
//    //유저의 id로 folder name 리스트 가져오기
//    public List<FolderEntity> getFolderList(Long userId){
//        List<FolderEntity> folderEntityList = folderRepository.findAll();
//        List<FolderEntity> findList = new ArrayList<>();
//
//        for(FolderEntity x : folderEntityList){
//            if(x.getUserId() == userId){
//                findList.add(x);
//            }
//        }
//
//        return findList;
//    }
//}
