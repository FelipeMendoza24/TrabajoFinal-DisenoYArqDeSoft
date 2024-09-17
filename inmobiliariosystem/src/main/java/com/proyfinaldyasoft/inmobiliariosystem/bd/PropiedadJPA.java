package com.proyfinaldyasoft.inmobiliariosystem.bd;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropiedadJPA extends JpaRepository<PropiedadORM, Long> {

}
