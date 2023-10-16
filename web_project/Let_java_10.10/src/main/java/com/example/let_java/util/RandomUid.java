package com.example.let_java.util;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RandomUid {
    public static String getUUID() {
        UUID uuid = UUID.randomUUID();
        String str = uuid.toString();
        String uuidStr = str.replace("-", "");
        return uuidStr;
    }

}
