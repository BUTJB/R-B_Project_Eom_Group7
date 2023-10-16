package com.example.let_java.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequestMapping("mails")
@RestController
public class mailController {
    //邮件验证码
    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String from;
    @RequestMapping("code")
    public String code(@RequestBody Map<String,String> map){
        try{
            String mail = map.get("mail");
            String subject = "Robot验证码";
            String text = (int) (((Math.random() * 9) + 1) * 1000)+"";
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(from);
            simpleMailMessage.setTo(mail);
            simpleMailMessage.setSubject(subject);
            simpleMailMessage.setText(text);
            javaMailSender.send(simpleMailMessage);
            System.out.println("send mail to: "+ mail +" and content: "+ text);
            return text;
        }catch (Exception e) {
            System.out.println(e.getMessage());
            return "false";
        }
    }

}
