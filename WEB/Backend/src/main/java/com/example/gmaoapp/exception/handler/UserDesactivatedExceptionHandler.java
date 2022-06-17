package com.example.gmaoapp.exception.handler;

import com.example.gmaoapp.exception.UserDesactivatedException;
import com.example.gmaoapp.exception.errors.UserDesactivatedError;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@RestControllerAdvice
public class UserDesactivatedExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {UserDesactivatedException.class})
    public ResponseEntity<Object> handleUserDesactivated(UserDesactivatedException ex, WebRequest request){
        UserDesactivatedError error=UserDesactivatedError.builder().message(ex.getMessage()).status(HttpStatus.NOT_FOUND).timeStamp(LocalDateTime.now()).build();
        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpHeaders header,HttpStatus httpStatus, WebRequest request){
        UserDesactivatedError error=UserDesactivatedError.builder().message(ex.getMessage()).status(HttpStatus.NOT_FOUND).timeStamp(LocalDateTime.now()).build();
        return new ResponseEntity<>(error,HttpStatus.NOT_FOUND);
    }
}
