package com.gi.giback.mysql.location.repository;

import com.gi.giback.mysql.location.entity.LocationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<LocationEntity, String> {
}
