package com.gi.giback.repository;

import com.gi.giback.entity.MySqlTestEntity;
import com.gi.giback.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MySqlTestRepository extends JpaRepository<MySqlTestEntity, String> {
}
