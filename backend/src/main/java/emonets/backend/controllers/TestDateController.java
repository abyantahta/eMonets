package emonets.backend.controllers;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import emonets.backend.dto.CobaDateData;
import emonets.backend.dto.TransaksiData;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/cobadate")
@CrossOrigin
@Slf4j
public class TestDateController {
    
    @PostMapping
    public void nyobaDate(@RequestBody TransaksiData data){
        log.info("nominal: "+data.getNominal().toString());
        log.info("kategori: "+data.getKategori());
        log.info("deskripsi: "+data.getDeskripsi());
        log.info("tanggal: "+data.getTanggal());
        log.info("tipe: "+Integer.toString(data.getTipe()));
    }
}
