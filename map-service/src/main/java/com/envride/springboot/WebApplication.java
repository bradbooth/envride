package com.envride.springboot;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DirectionsResult;
import com.google.maps.model.DirectionsRoute;
import com.google.maps.model.LatLng;
import com.google.maps.model.TravelMode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
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
	public static String getDirections(@RequestParam String origin, @RequestParam String destination, @RequestParam String vehicleInfo) {


		Map<String, String> vehicleInfoMap = new Gson().fromJson(vehicleInfo, Map.class);

		Double co2TailpipeGpm = Double.parseDouble(vehicleInfoMap.get("co2TailpipeGpm"));


		GeoApiContext context = new GeoApiContext.Builder()
												 .apiKey("AIzaSyDetrDIsCKmqpgIar_GGhCL4PgflfyBkLw")
												 .build();



		DirectionsApiRequest apiRequest = DirectionsApi.newRequest(context);
		apiRequest.origin(origin);
		apiRequest.destination(destination);
		apiRequest.mode(TravelMode.DRIVING);

		DirectionsResult response;
		try {
			// Retrieve api response
			response = apiRequest.await();

			// Get first route returned
			DirectionsRoute firstRoute = response.routes[0];
			List<LatLng> pathPoints = firstRoute.overviewPolyline.decodePath();
			float distanceInMeters = firstRoute.legs[0].distance.inMeters;

			// Build response to be sent back
			Gson gson = new GsonBuilder().setPrettyPrinting().create();
			JsonObject builtResponse = new JsonObject();
			builtResponse.addProperty("distanceInMeters", distanceInMeters);
			builtResponse.addProperty("routeCo2InGrams", getRouteCO2(co2TailpipeGpm, distanceInMeters));
			builtResponse.addProperty("coordinates", gson.toJson(pathPoints));
			return gson.toJson(builtResponse);

		} catch (ApiException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return "Error: Unable to retrieve directions";
	}

	private static String getRouteCO2(Double co2TailpipeGpm, float distanceInMeters){

		// Convert
		double distanceInMiles = metersToMiles(distanceInMeters);
		double co2GTotal = co2TailpipeGpm * distanceInMiles;
		return String.valueOf(co2GTotal);
	}

	private static double metersToMiles(float meters){
		return meters / 1609;
	}


}