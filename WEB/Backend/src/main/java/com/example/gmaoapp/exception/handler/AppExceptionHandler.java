package com.example.gmaoapp.exception.handler;

import com.example.gmaoapp.exception.InvalidDataException;
import com.example.gmaoapp.exception.NoDataFoundException;
import com.example.gmaoapp.shared.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class AppExceptionHandler {
    @ExceptionHandler(value = {InvalidDataException.class})
    public ResponseEntity<Object> invalidDataException(InvalidDataException invalidDataException){
        ErrorMessage errorMessage= ErrorMessage.builder()
                .message(invalidDataException.getMessage())
                .timestamp(new Date())
                .code(422)
                .build();
        return new ResponseEntity<>(errorMessage, HttpStatus.UNPROCESSABLE_ENTITY);

    }

    @ExceptionHandler(value = {NoDataFoundException.class})
    public ResponseEntity<Object> noDatafoundException(NoDataFoundException noDataFoundException){
        ErrorMessage errorMessage= ErrorMessage.builder()
                .message(noDataFoundException.getMessage())
                .timestamp(new Date())
                .code(422)
                .build();
        return new ResponseEntity<>(errorMessage, HttpStatus.UNPROCESSABLE_ENTITY);

    }
}
