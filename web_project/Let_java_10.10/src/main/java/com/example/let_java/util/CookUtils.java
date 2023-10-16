package com.example.let_java.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public class CookUtils {

    public void setCookie(String uid, HttpServletResponse response) {
        // 将userCode放入cookie中
        Cookie cookie = new Cookie("userCode", uid);
        cookie.setPath("/");
        cookie.setMaxAge(-1);
        response.addCookie(cookie);
    }

    //取cookie
    public String getCookie(HttpServletRequest request) {
        String value = "";
        Cookie[] arr = request.getCookies();
        if (arr != null) {
            for (Cookie cookie : arr) {
                if (cookie.getName().equals("userCode")) {
                    value = cookie.getValue();
                }

            }
        }
        return value;
    }

}
