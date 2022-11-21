package emonets.backend.controllers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import emonets.backend.dto.CobaDateData;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/cobadate")
@CrossOrigin
@Slf4j
public class TestDateController {
    
    @PostMapping
    public void nyobaDate(@RequestBody CobaDateData date){
        log.info(date.getDate());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate dateTime = LocalDate.parse(date.getDate(), formatter);
        log.info(dateTime.toString());
    }
}
