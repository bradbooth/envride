package com.envride.springboot;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@SpringBootApplication
@RestController
public class WebApplication {

	public static void main(String[] args) {
		// google maps api key AIzaSyD_pxiHSjyGyHIzkikD8VDisYTqkJC0JQw
		SpringApplication app = new SpringApplication(WebApplication.class);
        app.setDefaultProperties(Collections
          .singletonMap("server.port", "8090"));
        app.run(args);
	}

	@CrossOrigin()
	@RequestMapping("/")
	public static String Hello() {

		GeoApiContext context = new GeoApiContext.Builder()
				.apiKey("AIzaSyD_pxiHSjyGyHIzkikD8VDisYTqkJC0JQw")
				.build();

		DirectionsApiRequest apiRequest = DirectionsApi.newRequest(context);
		apiRequest.origin("Toronto");
		apiRequest.destination("Mississauga");
		apiRequest.mode(TravelMode.DRIVING);

		DirectionsResult res = null;
		try {
			res = apiRequest.await();
		} catch (ApiException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		List<LatLng> pathPoints = res.routes[0].overviewPolyline.decodePath();
		System.out.println(gson.toJson(pathPoints));


		return gson.toJson(pathPoints);
	}


}