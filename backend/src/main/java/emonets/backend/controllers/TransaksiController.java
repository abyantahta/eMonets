package emonets.backend.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import emonets.backend.dto.ResponseData;
import emonets.backend.dto.TransaksiData;
import emonets.backend.helper.JwtVerifier;
import emonets.backend.services.TransaksiService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/transaksi")
@AllArgsConstructor
@CrossOrigin
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
}
