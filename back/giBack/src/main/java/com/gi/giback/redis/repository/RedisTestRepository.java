package com.gi.giback.redis.repository;

import com.gi.giback.redis.entity.RedisTestEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedisTestRepository extends CrudRepository<RedisTestEntity, String> {

}
