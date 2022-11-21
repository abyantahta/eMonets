package emonets.backend.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import emonets.backend.dto.ResponseData;
import emonets.backend.dto.TransaksiData;
import emonets.backend.helper.JwtVerifier;
import emonets.backend.models.Transaksi;
import emonets.backend.services.TransaksiService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/transaksi")
@AllArgsConstructor
@CrossOrigin
@Slf4j
public class TransaksiController {
    
    private final TransaksiService transaksiService;

    @PostMapping
    public ResponseEntity<ResponseData<?>> addTransaksi(@Valid @RequestBody TransaksiData data, Errors errors, HttpServletRequest request){
        ResponseData<?> responseData = new ResponseData<>();
        //cek error validasi
        if(errors.hasErrors()){
            //mendapatkan semua error
            for (ObjectError error : errors.getAllErrors()) {
                responseData.getMessages().add(error.getDefaultMessage());
                log.info(error.getDefaultMessage());
            }
            //melengkapi responseData
            responseData.setStatus(false);
            responseData.setPayload(null);
            //return
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
        }
        else{
            //proses authentikasi
            try {
                String email = JwtVerifier.verifier(request);
                transaksiService.addTransaksi(data, email);
                responseData.setStatus(true);
                responseData.getMessages().add("transaksi ditambahkan");
                responseData.setPayload(null);

                return ResponseEntity.ok().body(responseData);
            } catch (Exception e) {
                responseData.setStatus(false);
                responseData.getMessages().add(e.getMessage());
                responseData.setPayload(null);
    
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseData);
            }
        }
    }

    // @GetMapping
    // public ResponseEntity<ResponseData<List<TransaksiData>>> getAllTransaksi(HttpServletRequest request){

    // }

    @GetMapping
    public ResponseEntity<ResponseData<List<TransaksiData>>> getAllTransaksiByUser(HttpServletRequest request){

        ResponseData<List<TransaksiData>> responseData = new ResponseData<>();

        try {
            String email = JwtVerifier.verifier(request);
            List<Transaksi> allTransaksi = transaksiService.getAllTransaksi(email);
            List<TransaksiData> kembalianTransaksi = new ArrayList<>();
    
            for (Transaksi transaksi : allTransaksi) {
                TransaksiData transaksiData = new TransaksiData();
                transaksiData.setId(transaksi.getId());
                transaksiData.setNominal(transaksi.getNominal());
                transaksiData.setKategori(transaksi.getKategori());
                transaksiData.setDeskripsi(transaksi.getDeskripsi());
                transaksiData.setTanggal(transaksi.getTanggal().toString());
                transaksiData.setTipe(transaksi.getTipe());
                kembalianTransaksi.add(transaksiData);
            }
            responseData.setStatus(true);
            responseData.getMessages().add("berhasil");
            responseData.setPayload(kembalianTransaksi);
            return ResponseEntity.ok().body(responseData);
        } catch (Exception e) {
            responseData.setStatus(false);
            responseData.getMessages().add(e.getMessage());
            responseData.setPayload(null);

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseData);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseData<List<TransaksiData>>> deleteTransaksi(@PathVariable Long id, HttpServletRequest request){
        ResponseData<List<TransaksiData>> responseData = new ResponseData<>();
        try {
            String email = JwtVerifier.verifier(request);
            transaksiService.deleteTransaksi(id);
            List<Transaksi> allTransaksi = transaksiService.getAllTransaksi(email);
            List<TransaksiData> kembalianTransaksi = new ArrayList<>();
    
            for (Transaksi transaksi : allTransaksi) {
                TransaksiData transaksiData = new TransaksiData();
                transaksiData.setId(transaksi.getId());
                transaksiData.setNominal(transaksi.getNominal());
                transaksiData.setKategori(transaksi.getKategori());
                transaksiData.setDeskripsi(transaksi.getDeskripsi());
                transaksiData.setTanggal(transaksi.getTanggal().toString());
                transaksiData.setTipe(transaksi.getTipe());
                kembalianTransaksi.add(transaksiData);
            }
            responseData.setStatus(true);
            responseData.getMessages().add("transaksi berhasil dihapus");
            responseData.setPayload(kembalianTransaksi);

            return ResponseEntity.ok().body(responseData);
        } catch (Exception e) {
            responseData.setStatus(false);
            responseData.getMessages().add(e.getMessage());
            responseData.setPayload(null);

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseData);
        }
    }
}
