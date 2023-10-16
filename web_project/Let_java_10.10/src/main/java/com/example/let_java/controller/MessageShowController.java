package com.example.let_java.controller;

import com.example.let_java.entity.Robot;
import com.example.let_java.entity.User;
import com.example.let_java.mapper.RobotMapper;
import com.example.let_java.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("MessageShow")
@RestController
public class MessageShowController {
    @Autowired
    private UserMapper userMapper;
    @RequestMapping("getMessage")
    public User getMessage(HttpServletRequest request, @RequestBody Map<String, String> map)throws Exception {
        try {
            String state = map.get("state");
            if (state.equals("202")) {
                HttpSession session = request.getSession();
                String uid = (String) session.getAttribute("userid");

                /**
                在这用session获取uid有问题，会得到null
                于是采取的解决方案是，在前端把uid，传进来（在登陆的时候存在本地）
                 **/
                if(uid==null || uid.equals("")){
                   uid = map.get("userid");
                }
//                System.out.println(uid);
                User user = userMapper.findUser(uid);
                return user;
            } else {
                return null;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @RequestMapping("getAvatar")
    public String getAvatar(@RequestBody Map<String, String> map)throws Exception{
        try {
                String avatar = userMapper.findAvatar(map.get("userid"));
                System.out.println(avatar);
                return avatar;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Autowired
    private RobotMapper robotMapper;
    @RequestMapping("getAvatarR")
    public String getAvatarR(@RequestBody Map<String, String> map)throws Exception{
        try {
            String avatarR = robotMapper.findAvatarR(map.get("userid"));
            System.out.println(avatarR);
            return avatarR;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }



    @RequestMapping("getMessageR")
    public  Map<String,String> getMessageR(HttpServletRequest request, @RequestBody Map<String, String> map)throws Exception {
        try {
            Map<String,String> list = new HashMap<>();
            String state = map.get("state");
            if (state.equals("202")) {
                String uid = map.get("userid");
                String rid = map.get("robotid");
//                System.out.println(uid);
                User user = userMapper.findUser(uid);
                Robot robot = robotMapper.findRobot(uid);
                list.put("userid",uid);
                list.put("state","true");
                list.put("robotname",robot.getRname());
                list.put("robotid",rid);
                list.put("message",robot.getMessage());
                list.put("phone",user.getPhone());
                list.put("email",user.getMail());
                return list;
            } else {
                return null;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}


