package com.envride.springboot;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.maps.DirectionsApi;
import com.google.maps.DirectionsApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.*;
import com.google.maps.DistanceMatrixApiRequest;
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
	public static String getDirections(
		@RequestParam String origin1, 
		@RequestParam String origin2,
		@RequestParam String destination,
		@RequestParam Double co2
	) {

		GeoApiContext context = new GeoApiContext.Builder()
										.apiKey(System.getenv("GOOGLE_MAPS_API_KEY"))
										.build();

		String[] route = whichClient(0,0,origin1, origin2, destination);

		if ( route == null ){
			System.out.println("Better to travel separately");
		} else {

			DirectionsApiRequest apiRequest = DirectionsApi.newRequest(context);
			apiRequest.origin(route[0]);
			apiRequest.waypoints(route[1]);
			apiRequest.destination(destination);
			apiRequest.mode(TravelMode.DRIVING);
			DirectionsResult response;
			try {

				response = apiRequest.await();
				DirectionsRoute firstRoute = response.routes[0];
				List<LatLng> pathPoints = firstRoute.overviewPolyline.decodePath();
				float distanceInMeters = firstRoute.legs[0].distance.inMeters;
				
				// Build response to be sent back
				Gson gson = new GsonBuilder().setPrettyPrinting().create();
				JsonObject builtResponse = new JsonObject();
				builtResponse.addProperty("distanceInMeters", distanceInMeters);
				builtResponse.addProperty("routeCo2InGrams", getRouteCO2(co2, distanceInMeters));

				JsonArray coordinates = new JsonArray();
				for ( LatLng coord : pathPoints ){
					coordinates.add(coord.toString());
				}
				builtResponse.add("coordinates", coordinates);
				return gson.toJson(builtResponse);

			} catch (ApiException e) {
				e.printStackTrace();
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return "Error: Unable to retrieve directions";
	}

	@CrossOrigin()
	@RequestMapping("/distance")
	public static double getDistance(@RequestParam String origin, @RequestParam String destination){

		GeoApiContext context = new GeoApiContext.Builder()
												 .apiKey(System.getenv("GOOGLE_MAPS_API_KEY"))
												 .build();
	
		DistanceMatrixApiRequest apiRequest = DistanceMatrixApi.newRequest(context);
		apiRequest.origins(origin);
		apiRequest.destinations(destination);
		apiRequest.mode(TravelMode.DRIVING);

		DistanceMatrix res;
		double distApart;

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

	private static double metersToMiles(float meters){
		return meters / 1609;
	}

	private static String getRouteCO2(Double co2TailpipeGpm, float distanceInMeters){
		// Convert
		double distanceInMiles = metersToMiles(distanceInMeters);
		double co2GTotal = co2TailpipeGpm * distanceInMiles;
		return String.valueOf(co2GTotal);
	}

	public static String[] whichClient(double co2A, double co2B, String originA, String originB, String dest){
		String[] out = { originB, originA, dest };

		//get the distance from A to B to destination
		double distABdest = getDistance(originA, originB);
		distABdest += getDistance(originB, dest);

		//get the distance from B to A to destination
		double distBAdest = getDistance(originB, originA);
		distBAdest += getDistance(originA, dest);
		
		//get co2 emission for the distance from A to B to destination using A's vehicle
		double curCO2A = (distABdest/1.6) *co2A;

		//get co2 emission for the distance from B to A to destination using B's vehicle
		double curCO2B = (distBAdest/1.6) *co2B;

		//initialize the co2 emission to be used and then decide on which one by comparing the two of them
		//once decided, the returned client is chosen (only changed if A is the more efficient client)
		double co2Used = curCO2B;
		if (curCO2A < curCO2B){
			co2Used = curCO2A;
			out = new String[]{ originA, originB, dest };
		}

		//this is for calculating whether it is more efficient for both clients to go separately

		//get the distance from A to destination
		double distA = getDistance(originA, dest);

		//get the distance from B to destination
		double distB = getDistance(originB, dest);

		//total co2 emissions given off by this option
		double sumCo2 = (distA/1.6 *co2A) + (distB/1.6 *co2B);

		//decide on whether this is the better option
		if (sumCo2 < co2Used) out = null;
		
		//return the chosen option (A, B, separate)
		return out;

	}
}