package com.gi.giback.mysql.folder.controller;

import com.gi.giback.mysql.folder.dto.FolderResponseDto;
import com.gi.giback.mysql.folder.service.FolderService;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "폴더 컨트롤러")
@RequestMapping("/folder")
public class FolderController {
    private final FolderService folderService;
    public FolderController(FolderService folderService){
        this.folderService = folderService;
    }

    //userId로 폴더 리스트 가져오기
    @GetMapping("/getList/userid={userid}")
    public ResponseEntity<?> getFolderLst(Long userId){
        List<FolderResponseDto> folderList = folderService.getFolderList(userId);

        if(folderList != null){
            return ResponseEntity.ok(folderList);
        }
        else{
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Folder Empty");
        }
    }

    //folderId로 폴더 삭제하기
    public void deleteFolder(Long folderId){
        folderService.deleteFolder(folderId);
    }

}
