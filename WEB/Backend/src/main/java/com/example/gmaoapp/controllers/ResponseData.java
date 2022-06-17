package com.example.gmaoapp.controllers;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseData {

    private String id;
    private String fileName;
    private String downloadURL;
    private String fileType;
    private long fileSize;
}
