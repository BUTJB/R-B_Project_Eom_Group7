package com.example.let_java.mapper;

import com.example.let_java.entity.Robot;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface RobotMapper {

    Robot findRobot(String uid);
    int updateAvatarR(String uid,String avatar);
    String findAvatarR(String uid);
    Integer insertRobot(String uid,String rid);
    String findRid(String uid);
    Integer updateRobotMessage(String rid, String robotname, String message,String phone);

}



