FROM maven:3.9.9-amazoncorretto-21 as builder
WORKDIR /app
COPY . .

RUN mvn dependency:resolve
RUN mvn clean package -DskipTests

FROM amazoncorretto:21
WORKDIR /app

COPY --from=builder ./app/target/*.jar ./application.jar

EXPOSE 8080
EXPOSE 9090

ENV DATASOURCE_URL=''
ENV DATASOURCE_USERNAME=''
ENV DATASOURCE_URL=''
ENV POSTGRES_HOST=localhost

RUN echo "the env var POSTGRES_HOST value is $POSTGRES_HOST"

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=production", "application.jar"]

ENV SPRING_PROFILES_ACTIVE='production'
ENV TZ='America/Sao_Paulo'

ENTRYPOINT java -jar caxiasdiaryapi.jar