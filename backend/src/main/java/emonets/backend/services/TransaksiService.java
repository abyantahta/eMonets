package emonets.backend.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.stereotype.Service;

import emonets.backend.dto.TransaksiData;
import emonets.backend.models.AppUser;
import emonets.backend.models.Transaksi;
import emonets.backend.models.TransaksiRepo;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TransaksiService {
    
    private final TransaksiRepo transaksiRepo;
    private final AppUserService appUserService;

    public void addTransaksi(TransaksiData data, String email){
        if(data.getId() == null){
            Transaksi transaksi = new Transaksi();
            AppUser appUser = appUserService.findAppUserByEmail(email);

            //parsing react date to local date times
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateTime = LocalDate.parse(data.getTanggal(), formatter);

            //parsing transaksiData to transaksi
            transaksi.setAppUser(appUser);
            transaksi.setNominal(data.getNominal());
            transaksi.setKategori(data.getKategori());
            transaksi.setDeskripsi(data.getDeskripsi());
            transaksi.setTanggal(dateTime);
            transaksi.setTipe(data.getTipe());

            transaksiRepo.save(transaksi);
        }
        else{
            return;
        }
    }

    public List<Transaksi> getAllTransaksi(String email){
        return transaksiRepo.findAllByEmail(email);
    }

    public String deleteTransaksi(Long id){
        if(transaksiRepo.existsById(id)){
            transaksiRepo.deleteById(id);
            return "transaksi berhasil dihapus";
        }
        else{
            return "transaksi tidak ditemukan";
        }
    }
}
