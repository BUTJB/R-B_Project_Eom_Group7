package com.example.let_java.controller;

import com.example.let_java.mapper.RobotMapper;
import com.example.let_java.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@RequestMapping("/Edit")
@RestController
public class EditPersonMessageController {
    @Autowired
    private UserMapper userMapper;
    @RequestMapping("/EditPersonMessage")
    public String EditPersonMessage(HttpServletRequest request, @RequestBody Map<String,String> map)throws Exception{
        try{
            HttpSession session = request.getSession();
            String uid = (String)session.getAttribute("userid");
            /**
             在这用session获取uid有问题，会得到null
             于是采取的解决方案是，在前端把uid，传进来（在登陆的时候存在本地）
             **/
            if(uid == null || uid.equals(""))
            {
                uid = map.get("userid");
            }
//           System.out.println(uid);
            String username = map.get("username");

            String phone = map.get("phone");
            String mail = map.get("mail");
            String message = map.get("message");
            userMapper.updatePersonalMessage(uid,username,phone,mail,message);
            return "true";
        }catch(Exception e){
            System.out.println(e.getMessage());
            return "false";
        }
    }

    @RequestMapping("updateAvatar")
    public String updateAvatar(@RequestBody Map<String,String>map)throws Exception
    {
        try{
            System.out.println(map);
            userMapper.updateAvatar(map.get("userid"),map.get("url"));
            return "true";
        }catch (Exception e)
        {
            System.out.println(e.getMessage());
            return "false";
        }

    }


    @RequestMapping("/EditRobotMessage")
    public String EditRobotMessage(HttpServletRequest request, @RequestBody Map<String,String> map)throws Exception{
        try{
            String rid = map.get("robotid");
            String robotname = map.get("robotname");
            String message = map.get("message");
            String phone = map.get("phone");
            robotMapper.updateRobotMessage(rid, robotname, message,phone);
            return "true";
        }catch(Exception e){
            System.out.println(e.getMessage());
            return "false";
        }
    }

    @Autowired
    private RobotMapper robotMapper;
    @RequestMapping(value = "updateAvatarR")
    public String updateAvatarR(@RequestBody Map<String,String>map)throws Exception
    {
        try{
            System.out.println("map"+map);
            robotMapper.updateAvatarR(map.get("userid"),map.get("url"));
            return "true";
        }catch (Exception e)
        {
            System.out.println(e.getMessage());
            return "false";
        }

    }


}
