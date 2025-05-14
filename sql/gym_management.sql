CREATE DATABASE gym_management;

USE gym_management;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash CHAR(60) NOT NULL
);