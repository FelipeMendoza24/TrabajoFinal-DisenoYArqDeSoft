package com.proyfinaldyasoft.inmobiliariosystem.controller;
import org.springframework.web.bind.annotation.*;

@RestController
public class PropiedadController {

    @GetMapping(path = "/saludar")
    public String saludar(){
        return "saludar";
    }

}
