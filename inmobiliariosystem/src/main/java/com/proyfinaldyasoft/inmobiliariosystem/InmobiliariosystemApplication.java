package com.proyfinaldyasoft.inmobiliariosystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class }) // Puesto por error que salia
public class InmobiliariosystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(InmobiliariosystemApplication.class, args);
	}

}
