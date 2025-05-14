CREATE DATABASE IF NOT EXISTS gym_management;
USE gym_management;

CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    contraseña VARCHAR(100),
    nacimiento DATE,
    imagen VARCHAR(255)
);

CREATE TABLE Admins (
    id_admin INT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    contraseña VARCHAR(100)
);

CREATE TABLE Entrenadores (
    id_entrenador INT PRIMARY KEY,
    nombre VARCHAR(100),
    especialidad VARCHAR(100),
    email VARCHAR(100),
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
    imagen VARCHAR(255)
);

CREATE TABLE Rutina (
    id_rutina INT PRIMARY KEY,
    id_usuario INT,
    id_entrenador INT,
    nombre VARCHAR(100),
    descripcion TEXT,
    plazo_de_tiempo VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_entrenador) REFERENCES Entrenadores(id_entrenador)
);

CREATE TABLE Registro_Peso (
    id_registro INT PRIMARY KEY,
    id_usuario INT,
    id_rutina INT,
    peso_inicial DECIMAL(5,2),
    peso_final DECIMAL(5,2),
    fecha_inicio DATE,
    fecha_final DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_rutina) REFERENCES Rutina(id_rutina)
);

CREATE TABLE Ejercicios_en_rutina (
    id_ejercicio INT PRIMARY KEY,
    id_rutina INT,
    repeticiones INT,
    ejercicio VARCHAR(100),
    series INT,
    descanso VARCHAR(50),
    FOREIGN KEY (id_rutina) REFERENCES Rutina(id_rutina)
);

CREATE TABLE Porcentaje_Grasa (
    id_registro INT PRIMARY KEY,
    id_usuario INT,
    id_rutina INT,
    porcentaje_grasa_inicial DECIMAL(5,2),
    porcentaje_grasa_final DECIMAL(5,2),
    fecha_inicio DATE,
    fecha_final DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_rutina) REFERENCES Rutina(id_rutina)
);

CREATE TABLE Porcentaje_Masa (
    id_registro INT PRIMARY KEY,
    id_usuario INT,
    id_rutina INT,
    porcentaje_masa_inicial DECIMAL(5,2),
    porcentaje_masa_final DECIMAL(5,2),
    fecha_inicio DATE,
    fecha_final DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_rutina) REFERENCES Rutina(id_rutina)
);