-- Verificar y crear el tipo ENUM estadoUsuario si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'estadousuario') THEN
        CREATE TYPE estadoUsuario AS ENUM ('activado', 'desactivado');
    END IF;
END $$;

-- Verificar y crear el tipo ENUM roles si no existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'roles') THEN
        CREATE TYPE roles AS ENUM ('Cliente', 'Admin');
    END IF;
END $$;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS usuarios (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	nombre VARCHAR(100),
	email VARCHAR(150) NOT NULL UNIQUE,
	password VARCHAR(150) NOT NULL,
	rol roles DEFAULT 'Cliente',	
	estado estadoUsuario DEFAULT 'activado'
);

CREATE TABLE IF NOT EXISTS categoria_mayor (
    id_cat_may SERIAL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    descripcion TEXT
);

CREATE TABLE IF NOT EXISTS productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    descripcion TEXT
);
