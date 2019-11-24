package com.envride.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@SpringBootApplication
@RestController
public class WebApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(WebApplication.class);
        app.setDefaultProperties(Collections
          .singletonMap("server.port", "8090"));
        app.run(args);
	}

	@RequestMapping("/")
	public static String Hello() {
		 return "Hello from app";
	}


}