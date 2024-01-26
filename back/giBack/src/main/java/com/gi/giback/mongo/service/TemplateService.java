package com.gi.giback.mongo.service;

import com.gi.giback.mongo.repository.TemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TemplateService {
    @Autowired
    private TemplateRepository repository;

}
