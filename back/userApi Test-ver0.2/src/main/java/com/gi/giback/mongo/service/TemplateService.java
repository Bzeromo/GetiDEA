package com.gi.giback.mongo.service;

import com.gi.giback.mongo.entity.TemplateEntity;
import com.gi.giback.mongo.repository.TemplateRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TemplateService {
    @Autowired
    private TemplateRepository repository;

    public Optional<TemplateEntity> getTemplate(String templateId) {
        return repository.findById(templateId);
    }
}
