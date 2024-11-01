-- SQLBook: Code
CREATE TYPE estadoUsuario AS ENUM ('activado','desactivado');
CREATE TYPE roles AS ENUM ('Cliente','Admin');

CREATE TABLE IF NOT EXISTS usuarios (
	id SERIAL PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	emaIl VARCHAR(150) NOT NULL,
	pass VARCHAR(150) NOT NULL,
	rol roles,	
	estado estadoUsuario 
);