package com.comforttravels.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class EnquiryRequest {
    @NotBlank
    String name;

    @Email @NotBlank
    String email;

    String phone;

    @NotBlank @Size(max = 2000)
    String message;
}