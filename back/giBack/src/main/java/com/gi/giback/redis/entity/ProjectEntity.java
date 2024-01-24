package com.gi.giback.redis.entity;

import jakarta.persistence.Id;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "projects")
@Data
@NoArgsConstructor
public class ProjectEntity {
    @Id
    private String projectId;
    private Map<String, List<UserChange>> userChanges;
}




