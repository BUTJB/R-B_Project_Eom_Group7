package com.example.let_java;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.let_java.mapper")
public class LetJavaApplication {
    public static void main(String[] args) {
        SpringApplication.run(LetJavaApplication.class, args);
    }
}
