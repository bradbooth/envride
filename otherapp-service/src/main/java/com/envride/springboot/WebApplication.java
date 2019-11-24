package com.envride.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@SpringBootApplication
@RestController
public class WebApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(WebApplication.class);
        app.setDefaultProperties(Collections
          .singletonMap("server.port", "8091"));
        app.run(args);
	}

	@RequestMapping("/")
	public static String Hello() {

         final String uri = "http://app:8090/";
     
         RestTemplate restTemplate = new RestTemplate();
         String result = restTemplate.getForObject(uri, String.class);
		 return "Response from app:\n" + result;
	}


}