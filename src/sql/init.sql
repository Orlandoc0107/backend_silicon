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

-- Tabla para las categorías mayores
CREATE TABLE categorias_mayores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL
);

-- Tabla para las categorías menores, relacionada con la categoría mayor
CREATE TABLE categorias_menores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    categoria_mayor_id INT REFERENCES categorias_mayores(id)
);

-- Tabla de productos, relacionada con las categorías
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre varchar (100) NOT NULL,
    descripcion TEXT,
    stock INT DEFAULT 0,
    categoria_menor_id INT REFERENCES categorias_menores(id)
);

INSERT INTO categorias_mayores (nombre) VALUES (
	'Bebidas',
	'Comida Rápida',
	'Comida Congelada'
)

SELECT id FROM categorias mayores WHERE id = 'Bebidas'

INSERT INTO categorias_menores (nombre, categoria_mayor_id) VALUES (
	'Gaseosas', 1,
	'Agua', 1,
	'Vinos', 1,
	'Cervezas', 1,
	'Aperitivos', 1
)

INSERT INTO productos (nombre, descripcion, stock, categoria_menor_id) VALUES (
	'Coca-Cola', 'CocaCola de 2.25L', 15, 1,
    'Pepsi', 'Pepsi de 2.25L', 15, 1,
	'Sprite', 'Sprite de 2.25L', 15, 1
)

INSERT INTO productos (nombre, descripcion, stock, categoria_menor_id) VALUES (
	'Agua Mineral', 'Agua sin gas de 500 ml', 15, 2,
	'Agua con Gas', 'Agua con gas de 500 ml', 15, 2
)

INSERT INTO productos (nombre, descripcion, stock, categoria_menor_id) VALUES (
	'Santa Julia', 'Santa Julia Blanco de 750 ml', 15, 3,
	'Estancia Mendoza', 'Estancia Mendoza Malbec 750ml', 15, 3,
	'Trumpeter', 'Tinto Trumpeter Malbec 750ml', 15, 3
)

INSERT INTO productos (nombre, descripcion, stock, categoria_menor_id) VALUES (
	'Patagonia', 'Patagonia Bohemian Pilsener lata 473ml', 15, 4,
	'Brahma', 'Cerveza Brahma lata 473ml', 15, 4,
	'Heineken', 'Cerveza Heineken Botella 330ml', 15, 4
)

INSERT INTO productos (nombre, descripcion, stock, categoria_menor_id) VALUES (
	'Fernet', 'Fernet Branca 450 ml', 15, 5,
	'Fernet', 'Fernet Branca 750 ml', 15, 5,
	'Campari', 'Campari Aperitivo de 750ml', 15, 5
)

SELECT id FROM categorias mayores WHERE id = 'Comida Rápida'

INSERT INTO categorias_menores (nombre, categoria_mayor_id) VALUES (
	'Papas Fritas', 2,
	'Snacks', 2
)

INSERT INTO productos (nombre, descripcion, stock, categoria_menor_id) VALUES (
	'Lays Clásicas', 'Papas Fritas Lays Clásicas 134gr', 15, 1,
	'Lays Jamón Serrano', 'Papas Fritas Lays Jamón Serrano 134gr', 15, 1,
	'Lays Queso Crema y Cebolla', 'Papas Fritas Lays Queso Crema y Cebolla 134gr', 15, 1
)

INSERT INTO productos (nombre, descripcion, stock, categoria_menor_id) VALUES (
	'Saladix Jamón', 'Galletitas Saladix Jamón 100gr', 15, 2,
	'Saladix Queso', 'Galletitas Saladix Queso 100gr', 15, 2,
	'Saladix Jamón y Queso', 'Galletitas Saladix Jamón y Queso 100gr', 15, 2
)

SELECT id FROM categorias mayores WHERE id = 'Comida Congelada'

INSERT INTO categorias_menores (nombre, categoria_mayor_id) VALUES (
	'Pizza Congelada', 3,
	'Ñoquis Congelados', 3
)

INSERT INTO productos (nombre, descripcion, stock, categoria_menor_id) VALUES (
	'Pizza Congelada Mediana Jamón y Queso', 'Pizza Congelada Mediana Jamón y Queso 12 porciones', 15, 1,
	'Pizza Congelada Grande Jamón y Queso', 'Pizza Congelada Grande Jamón y Queso 16 porciones', 15, 1,
	'Pizza Congelada Mediana Mozzarella', 'Pizza Congelada Mediana Mozzarella 12 porciones', 15, 1,
	'Pizza Congelada Grande Mozzarella', 'Pizza Congelada Grande Mozzarella 16 porciones', 15, 1,
	'Pizza Congelada Mediana Primavera', 'Pizza Congelada Mediana Primavera 12 porciones', 15, 1,
	'Pizza Congelada Grande Primavera', 'Pizza Congelada Grande Primavera 16 porciones', 15, 1
)

INSERT INTO productos (nombre, descripcion, stock, categoria_menor_id) VALUES (
	'Ñoquis Congelados Chicos', 'Bandeja de Ñoquis Congelados Chica 250gr', 15, 2,
	'Ñoquis Congelados Medianos', 'Bandeja de Ñoquis Congelados Mediana 500gr', 15, 2,
	'Ñoquis Congelados Grandes', 'Bandeja de Ñoquis Congelados Grande 1000gr', 15, 2
)