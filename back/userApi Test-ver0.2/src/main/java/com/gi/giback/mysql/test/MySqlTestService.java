package com.gi.giback.mysql.test;

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
        mySqlTestEntity.setName(mySqlTestDto.getName());

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
