package com.gi.giback.mongo.repository;

import com.gi.giback.mongo.entity.MongoTestEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MongoTestRepository extends MongoRepository<MongoTestEntity, String> {
}
