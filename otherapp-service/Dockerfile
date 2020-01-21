# Build
FROM maven:3.6-jdk-8 AS build  
COPY src /usr/src/app/src  
COPY pom.xml /usr/src/app  
RUN mvn -f /usr/src/app/pom.xml clean package

# Copy over jar
FROM openjdk:8-jdk-alpine
COPY --from=build /usr/src/app/target/*.jar app.jar
VOLUME /tmp
EXPOSE 8091

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]