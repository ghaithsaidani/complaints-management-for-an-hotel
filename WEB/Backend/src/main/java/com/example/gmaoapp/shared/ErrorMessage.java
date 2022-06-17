package com.example.gmaoapp.shared;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Data
@FieldDefaults(level= AccessLevel.PRIVATE)
@Builder
public class ErrorMessage {

    String message;
    Date timestamp;
    Integer code;

}
