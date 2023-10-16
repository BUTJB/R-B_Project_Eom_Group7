package com.example.let_java.controller;
import com.example.let_java.entity.Robot;
import com.example.let_java.mapper.RobotMapper;
import com.example.let_java.mapper.UserMapper;
import com.example.let_java.entity.User;
import com.example.let_java.util.CookUtils;
import com.example.let_java.util.RandomUid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("Login")
@RestController
public class loginController {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private RandomUid UID;
    @Autowired
    private RobotMapper robotMapper;
    //    注册
@RequestMapping("register")
    public Map<String,String> register(@RequestBody Map<String,String> map,HttpServletResponse response,HttpServletRequest request) {
    int b=1;
    //接收前端加盐数据
    String username = map.get("username");
    String password = map.get("password");
    String mail = map.get("mail");
//    后端再次加盐（‘zuihou’）密码
    String salt_pass = password + "zuihou";
    String pass_final = DigestUtils.md5DigestAsHex(salt_pass.getBytes());
    //这里意味着存入的密码就是加密过的 滴滴滴
    //检查库里面的用户名是否已经存在
    List<User> users = userMapper.findByUser(username);
    for (User m : users) {
        String user = m.getUsername();
        if (user.equals(username)) {
            b = 0;
            break;
        }
    }

    if(b==1){
         //生成唯一uid
         String uid = UID.getUUID();
         //session 相当于全局变量，通过uid唯一标识用户
        HttpSession session = request.getSession();
        session.setAttribute("userid",uid);
        userMapper.insertUser(username,pass_final,mail,uid,"");

        String rid = UID.getUUID();
        robotMapper.insertRobot(uid,rid);
        Map<String,String> list = new HashMap<>();
        list.put("state","true");
        list.put("userid",uid);
        list.put("username",username);
        list.put("robotid",rid);
        return list;
    }
    else
    {
        Map<String,String> list = new HashMap<>();
        list.put("state","false");
        list.put("userid","");
        list.put("username","");
        list.put("avatar","");
        return list;
    }


}


//登录
  @RequestMapping("/login")
    public Map<String,String> login(@RequestBody Map<String,String> map,HttpServletResponse response,HttpServletRequest request)
  {
       int a=0;
       String uid ="";
       String username = map.get("username");
       String password =map.get("password");
       System.out.println(username);
       System.out.println(password);
       String salt_pass = password + "zuihou";

      String pass_final = DigestUtils.md5DigestAsHex(salt_pass.getBytes());
      //使用了 Apache Commons Codec 库中的 DigestUtils 类
      //来计算给定字符串的 MD5 哈希值，并将结果以十六进制字符串的形式返回。

      List<User> users = userMapper.findByUser(username);
      // String = userMapper.findUid(username);

      for (User m : users)
      {
          String user = m.getUsername();
          String pass = m.getPassword();
          uid = m.getUid();
          if (user.equals(username))
          {
              if (pass.equals(pass_final)) {
                  a=1;
                  break;
              }
          }
      }

      String robotid = robotMapper.findRid(uid);

      if(a==1){
          //session相当于全局变量
          HttpSession session = request.getSession();
          session.setAttribute("userid",uid);
          Map<String,String> list = new HashMap<>();
          list.put("userid",uid);
          list.put("state","true");
          list.put("username",username);
          list.put("robotid",robotid);
          return list;
      }
      else
      {
          Map<String,String> list = new HashMap<>();
          list.put("userid","");
          list.put("state","false");
          list.put("username","");
          return list;
      }
  }

}