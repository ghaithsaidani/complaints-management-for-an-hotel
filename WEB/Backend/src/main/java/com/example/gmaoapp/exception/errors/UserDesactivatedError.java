package com.example.gmaoapp.exception.errors;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class UserDesactivatedError {
    private String message;
    private HttpStatus status;
    private LocalDateTime timeStamp;
}
