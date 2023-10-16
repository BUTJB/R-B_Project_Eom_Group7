package com.example.let_java.controller;

import com.example.let_java.service.IFileService;
import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.model.PutObjectRequest;
import com.qcloud.cos.region.Region;
import org.springframework.stereotype.Repository;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/files")
public class fileController {
    @Resource
    private IFileService iFileService;
    @PostMapping("/uploadFile")
    public Map<String,String> uploadFile(@RequestParam("multipartFile") MultipartFile multipartFile) throws Exception {
        //文件上传前的名字
        String FileName = multipartFile.getOriginalFilename();
        // 创建一个临时文件
        File file = File.createTempFile(FileName, null);
        //创建输入流和输出流
        InputStream inputStream = multipartFile.getInputStream();
        OutputStream outputStream = new FileOutputStream(file);
        // 根据MultipartFile对象创建File对象
        FileCopyUtils.copy(inputStream,outputStream);
        int id  = (int) Math.random()*100+1;
        URL url = iFileService.upLoadFile(file,id);

        System.out.println(url);

        outputStream.close();
        file.delete();
        Map<String,String> map =new HashMap<>();
        map.put("url",url.toString());
        map.put("state","200");
        return map;
    }
}
