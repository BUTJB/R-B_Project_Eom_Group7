package com.example.let_java.mapper;

import com.example.let_java.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;


/** 处理用户数据操作的持久层接口 */
@Repository
public interface UserMapper {

    Integer insertUser(String username,String password,String mail,String uid,String avatar);
    List<User> findByUser(String username);
    User findUser(String uid);
    String findAvatar(String uid);
    String findUid(String username);
    int updateAvatar(String uid,String avatar);
    Integer updatePersonalMessage(String uid,String username,String phone,String mail,String message);

}
