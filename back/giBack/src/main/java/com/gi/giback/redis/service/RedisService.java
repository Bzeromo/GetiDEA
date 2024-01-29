package com.gi.giback.redis.service;

import com.gi.giback.redis.entity.UserChange;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

//@Service
public class RedisService {

    private static final int MAX_CHANGES_PER_USER = 30;
    private static final int RETAIN_CHANGES = 5;

    @Autowired
    private RedisTemplate<String, UserChange> redisTemplate;

    // 데이터 삽입 - 데이터 초과시 제거 로직도 구현
    public void addUserChange(String projectId, String userId, UserChange userChange) {
        String userKey = generateKey(projectId, userId);
        ListOperations<String, UserChange> listOps = redisTemplate.opsForList();

        // 각 사용자에 대한 UserChange 추가
        listOps.rightPush(userKey, userChange);

        // 특정 유저의 UserChange 리스트 크기 검사
        if (listOps.size(userKey) > MAX_CHANGES_PER_USER) {
            // 프로젝트 내 모든 유저의 UserChange 리스트를 하나로 합친 후 정렬
            List<UserChange> allChanges = getAllUserChangesForProject(projectId);
            allChanges.sort(Comparator.comparing(UserChange::getUpdateTime));

            trimUserChangesForAllUsers(projectId);
        }
    }

    // ProjectId에 속한 모든 user의 변경 정보를 가져와서 시간 순서로 정렬
    private List<UserChange> getAllUserChangesForProject(String projectId) {
        List<UserChange> allChanges = new ArrayList<>();
        for (String userId : getAllUserIds(projectId)) {
            String key = generateKey(projectId, userId);
            allChanges.addAll(redisTemplate.opsForList().range(key, 0, -1));
        }
        return allChanges;
    }

    // ProjectId의 모든 user의 데이터를 5개만 남기고 제거
    private void trimUserChangesForAllUsers(String projectId) {
        for (String userId : getAllUserIds(projectId)) {
            trimUserChangesForUser(projectId, userId);
        }
    }

    // ProjectId의 userId에 데이터를 5개만 남기고 제거
    private void trimUserChangesForUser(String projectId, String userId) {
        String key = generateKey(projectId, userId);
        ListOperations<String, UserChange> listOps = redisTemplate.opsForList();
        long size = listOps.size(key);

        if (size > RETAIN_CHANGES) {
            listOps.trim(key, size - RETAIN_CHANGES, size - 1);
        }
    }


    public List<UserChange> getAllUserChanges(String projectId) {
        // 동일 프로젝트 내 모든 유저의 UserChange 목록을 조회하고 정렬
        // 프로젝트 내의 모든 유저 ID 목록 필요
        List<UserChange> allChanges = new ArrayList<>();
        for (String userId : getAllUserIds(projectId)) {
            String key = generateKey(projectId, userId);
            List<UserChange> changes = redisTemplate.opsForList().range(key, 0, -1);
            allChanges.addAll(changes);
        }

        allChanges.sort(Comparator.comparing(UserChange::getUpdateTime));
        return allChanges;
    }

    // 되돌리기 작업 수행시 마지막 작업을 빼내고 제거
    public UserChange getLastChangeAndRemove(String projectId, String userId) {
        String key = generateKey(projectId, userId);
        return redisTemplate.opsForList().rightPop(key);
    }

    private String generateKey(String projectId, String userId) {
        return projectId + ":" + userId;
    }

    private List<String> getAllUserIds(String projectId) {
        // 프로젝트에 속한 모든 유저의 ID 목록을 반환하는 로직 구현 필요
        return new ArrayList<>();
    }
}
