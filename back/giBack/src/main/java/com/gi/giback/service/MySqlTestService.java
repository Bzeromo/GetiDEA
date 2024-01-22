package com.gi.giback.service;

import com.gi.giback.dto.MySqlTestDto;
import com.gi.giback.entity.MySqlTestEntity;
import com.gi.giback.repository.MySqlTestRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MySqlTestService {
    @Autowired
    private MySqlTestRepository mySqlTestRepository;

    public boolean registerTest(MySqlTestDto mySqlTestDto) {
        MySqlTestEntity mySqlTestEntity = new MySqlTestEntity();
        mySqlTestEntity.setId(mySqlTestDto.getId());
        mySqlTestEntity.setName(mySqlTestEntity.getName());

        mySqlTestRepository.save(mySqlTestEntity);

        return true;
    }

    public MySqlTestDto getTestById(String id) {
        MySqlTestEntity mySqlTestEntity= mySqlTestRepository.findById(id).get();
        MySqlTestDto mySqlTestDto = new MySqlTestDto();
        mySqlTestDto.setId(mySqlTestEntity.getId());
        mySqlTestDto.setName(mySqlTestEntity.getName());

        return mySqlTestDto;
    }
}
