package emonets.backend.dto;

import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TransaksiData {
    private Long id;
    private Long nominal;
    @NotEmpty(message = "kategori harus diisi")
    private String kategori;
    @NotEmpty(message = "deskripsi harus diisi")
    private String deskripsi;
    @NotEmpty(message = "tanggal harus diisi")
    private String tanggal;
    private int tipe;
}
