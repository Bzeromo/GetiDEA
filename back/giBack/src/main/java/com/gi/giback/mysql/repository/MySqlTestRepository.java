package com.gi.giback.mysql.repository;

import com.gi.giback.mysql.entity.MySqlTestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MySqlTestRepository extends JpaRepository<MySqlTestEntity, String> {
}
