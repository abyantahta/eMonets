package emonets.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TransaksiData {
    private Long id;
    @NotEmpty(message = "nominal harus diisi")
    private Long nominal;
    @NotEmpty(message = "kategori harus diisi")
    private String kategori;
    @NotEmpty(message = "deskripsi harus diisi")
    private String deskripsi;
    @NotEmpty(message = "tanggal harus diisi")
    private LocalDate tanggal;
    private int tipe;
}
