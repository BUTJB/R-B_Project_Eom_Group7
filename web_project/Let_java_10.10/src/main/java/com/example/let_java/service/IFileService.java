package com.example.let_java.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.URL;

public interface IFileService {
    public URL upLoadFile( File cosFile,Integer id)throws Exception;
}
