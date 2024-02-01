package com.gi.giback.mysql.test;

import com.gi.giback.mysql.test.MySqlTestEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MySqlTestRepository extends JpaRepository<MySqlTestEntity, String> {
}
