package com.example.let_java.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        //允许跨域的路径
        registry.addMapping("/**")
                //是否允许证书 不再默认开启
                .allowCredentials(true)
                .allowedOriginPatterns("*")
                .allowedHeaders("*")
                .allowedMethods("*")
                .maxAge(30*1000);
        //maxAge（）探测请求的有效时间
        WebMvcConfigurer.super.addCorsMappings(registry);
    }
}
