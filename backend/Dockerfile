# Bước 1: Build file JAR
FROM gradle:8.5-jdk21 AS build
WORKDIR /app
COPY . .

# Thay vì dùng ./gradlew (phụ thuộc vào wrapper), dùng trực tiếp lệnh 'gradle' có sẵn trong image
RUN gradle bootJar -x test --no-daemon

# Bước 2: Chạy ứng dụng
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]