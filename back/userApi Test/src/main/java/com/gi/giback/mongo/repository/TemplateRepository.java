package com.gi.giback.mongo.repository;

import com.gi.giback.mongo.entity.TemplateEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemplateRepository extends MongoRepository<TemplateEntity, String> {

}
