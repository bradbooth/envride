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
import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.DistanceMatrixApi;

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

	@CrossOrigin()
	@RequestMapping("/distance")
	public static long getDistance(@RequestParam String origin, @RequestParam String destination){

		GeoApiContext context = new GeoApiContext.Builder()
												 .apiKey(System.getenv("GOOGLE_MAPS_API_KEY"))
												 .build();
	
		DistanceMatrixApiRequest apiRequest = DistanceMatrixApi.newRequest(context);
		apiRequest.origins(origin);
		apiRequest.destinations(destination);
		apiRequest.mode(TravelMode.DRIVING);

		DistanceMatrix res;
		long distApart;

		try {

			res = apiRequest.await();
			distApart= res.rows[0].elements[0].distance.inMeters/1000;

			return distApart;

		} catch (ApiException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	 	
		return -1;

	}


	@CrossOrigin()
	@RequestMapping("/co2")
	public static long getCO2(@RequestParam long dist){
		//get co2 from front end
		long distInMiles = dist/1.6;
		//return co2*distInMiles;
	}

	public static String whichClient(long co2A, long co2B, String originA, String originB, String dest){
		String out = "B";

		//get the distance from A to B to destination
		long distABdest = getDistance(originA, originB);
		distABdest += getDistance(originB, destination);

		//get the distance from B to A to destination
		long distBAdest = getDistance(originB, originA);
		distBAdest += getDistance(originA, destination);
		
		//get co2 emission for the distance from A to B to destination using A's vehicle
		double curCO2A = distABdest/1.6 *co2A;

		//get co2 emission for the distance from B to A to destination using B's vehicle
		double curCO2B = distBAdest/1.6 *co2B;

		//initialize the co2 emission to be used and then decide on which one by comparing the two of them
		//once decided, the returned client is chosen (only changed if A is the more efficient client)
		double co2Used = curCO2B;
		if (curCO2A < curCO2B){
			co2Used = curCO2A;
			out = "A";
		}

		//this is for calculating whether it is more efficient for both clients to go separately

		//get the distance from A to destination
		long distA = getDistance(originA, dest);

		//get the distance from B to destination
		long distB = getDistance(originB, dest);

		//total co2 emissions given off by this option
		double sumCo2 = (distA/1.6 *co2A) + (distB/1.6 *co2B);

		//decide on whether this is the better option
		if (sumCo2 < co2Used) out = "separate";
		
		//return the chosen option (A, B, separate)
		return out;

	}
}