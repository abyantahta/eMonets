package emonets.backend.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/cobadate")
@CrossOrigin
@Slf4j
public class TestDateController {
    
    @PostMapping
    public void nyobaDate(@RequestBody String date){
        log.info(date);
    }
}
