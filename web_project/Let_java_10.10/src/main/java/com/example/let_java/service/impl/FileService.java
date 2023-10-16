package com.example.let_java.service.impl;

import com.example.let_java.service.IFileService;
import com.qcloud.cos.COSClient;
import com.qcloud.cos.ClientConfig;
import com.qcloud.cos.auth.BasicCOSCredentials;
import com.qcloud.cos.auth.COSCredentials;
import com.qcloud.cos.model.PutObjectRequest;
import com.qcloud.cos.region.Region;
import org.springframework.stereotype.Service;

import java.io.File;
import java.net.URL;
import java.util.Date;
@Service
public class FileService implements IFileService {
    @Override
    public URL upLoadFile(File cosFile,Integer id) throws Exception{
        COSCredentials cred = new BasicCOSCredentials("AKIDkHaeV7TaQzIMAhxxgwve6HBoAF3btwc3","EBrIRKvGJAlpfFbhXDdpkOluoSu9AuNc");
        // 2 设置bucket的区域, COS地域的简称请参照
        // https://cloud.tencent.com/document/product/436/6224
        ClientConfig clientConfig = new ClientConfig(new Region("ap-beijing"));
        // 3 生成cos客户端
        COSClient cosClient = new COSClient(cred, clientConfig);
        String bucketName = "buptlink-1310709738";
        String key = "image/"+"id:"+id+"-"+new Date().getTime() + ".png";
        // 简单文件上传, 最大支持 5 GB, 适用于小文件上传, 建议 20 M 以下的文件使用该接口
        // 大文件上传请参照 API 文档高级 API 上传
        // 指定要上传到 COS 上的路径

        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, key, cosFile);
        cosClient.putObject(putObjectRequest);
        cosClient.shutdown();
        // Date expiration = new Date(new Date().getTime() + 5 * 60 * 10000);
        Date expiration = new Date(new Date().getTime() + 100L * 12 * 30 * 24 * 3600 * 1000);//有效期100年
        URL url = cosClient.generatePresignedUrl(bucketName, key, expiration);
        return url;
    }


}
