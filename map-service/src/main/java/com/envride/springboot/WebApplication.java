package com.envride.springboot;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.LatLng;
import com.google.maps.model.TravelMode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@RestController
public class WebApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(WebApplication.class);
        app.setDefaultProperties(Collections
          .singletonMap("server.port", "8090"));
        app.run(args);
	}

	@CrossOrigin()
	@RequestMapping("/directions")
	public static String getDirections(@RequestParam String origin, @RequestParam String destination) {

		GeoApiContext context = new GeoApiContext.Builder()
												 .apiKey(System.getenv("GOOGLE_MAPS_API_KEY"))
												 .build();

		DirectionsApiRequest apiRequest = DirectionsApi.newRequest(context);
		apiRequest.origin(origin);
		apiRequest.destination(destination);
		apiRequest.mode(TravelMode.DRIVING);

		DirectionsResult response;
		try {

			response = apiRequest.await();
			Gson gson = new GsonBuilder().setPrettyPrinting().create();
			List<LatLng> pathPoints = response.routes[0].overviewPolyline.decodePath();
			System.out.println(gson.toJson(pathPoints));
			return gson.toJson(pathPoints);

		} catch (ApiException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return "Error: Unable to retrieve directions";
	}


}