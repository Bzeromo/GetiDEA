package com.gi.giback.mysql.folder.service;

import com.gi.giback.mysql.folder.dto.FolderResponseDto;
import com.gi.giback.mysql.folder.entity.FolderEntity;
import com.gi.giback.mysql.folder.repository.FolderRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class FolderService{
    //의존성 주입
    private final FolderRepository folderRepository;
    public FolderService(FolderRepository folderRepository){
        this.folderRepository = folderRepository;
    }

    public FolderResponseDto findByUserId(Long userId){
        FolderEntity folderEntity = folderRepository.findByUserId(userId);
        FolderResponseDto folderResponseDto = new FolderResponseDto();

        folderResponseDto.setFolderId(folderEntity.getFolderId());
        folderResponseDto.setFolderName(folderEntity.getFolderName());
        folderResponseDto.setUserId(folderResponseDto.getUserId());

        return folderResponseDto;
    }

    //유저의 id로 folder name 리스트 가져오기
    public List<FolderResponseDto> getFolderList(Long userId){
        List<FolderEntity> folderEntityList = folderRepository.findAll();

        List<FolderResponseDto> findList = new ArrayList<>();

        for(FolderEntity x : folderEntityList){
            if(x.getUserId() == userId){
                FolderResponseDto folderInfo = new FolderResponseDto();

                folderInfo.setFolderId(x.getFolderId());
                folderInfo.setFolderName(x.getFolderName());
                folderInfo.setUserId(x.getUserId());

                findList.add(folderInfo);
            }
        }

        return findList;
    }

    //folderId 로 폴더 삭제하기
    public void deleteFolder(Long folderId){
        folderRepository.deleteById(folderId);
    }

    //folderId로 폴더 이름 수정하기
}
