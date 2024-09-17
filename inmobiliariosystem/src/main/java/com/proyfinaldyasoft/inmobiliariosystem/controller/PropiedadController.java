package com.proyfinaldyasoft.inmobiliariosystem.controller;
import com.proyfinaldyasoft.inmobiliariosystem.bd.PropiedadJPA;
import com.proyfinaldyasoft.inmobiliariosystem.bd.PropiedadORM;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
public class PropiedadController {

    private PropiedadJPA propiedadJPA;
    List<PropiedadDTO> propiedades = new ArrayList<>();

    @GetMapping(path = "/propiedades/todos")
    public List<PropiedadORM> obtenerEstudiantes(){
        return propiedadJPA.findAll();
    }

    @PostMapping(path = "/propiedad")
    public String guardarPropiedad(@RequestBody PropiedadDTO propiedad){
        propiedades.add(propiedad);
        propiedadJPA.save(new PropiedadORM(propiedad.nombre(),propiedad.tipoOferta(),propiedad.ciudad(), propiedad.direccion(), propiedad.tipoPropiedad(), propiedad.tamano(), propiedad.precio(),propiedad.habitaciones(),propiedad.banos(),propiedad.estado()));
        return "Propiedad guardada";
    }

}
