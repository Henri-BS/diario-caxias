package com.pasifcode.caxias_diary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

import static org.springframework.data.web.config.EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO;

@EnableSpringDataWebSupport(pageSerializationMode = VIA_DTO)
@SpringBootApplication
public class CaxiasDiaryApplication {

	public static void main(String[] args) {
		SpringApplication.run(CaxiasDiaryApplication.class, args);
	}

}
