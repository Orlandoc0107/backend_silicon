-- Crear tipos ENUM
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'estadousuario') THEN
        CREATE TYPE estadousuario AS ENUM ('activado', 'desactivado');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'roles') THEN
        CREATE TYPE roles AS ENUM ('cliente', 'admin');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'estadoorden') THEN
        CREATE TYPE estadoorden AS ENUM ('pendiente', 'pagado', 'cancelado', 'enviado', 'entregado');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'estadocarrito') THEN
        CREATE TYPE estadocarrito AS ENUM ('abierto', 'en_espera');
    END IF;
END $$;

-- Extensión para UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Crear las tablas nuevamente si no existen

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(150) NOT NULL,
    rol roles DEFAULT 'cliente',
    estado estadoUsuario DEFAULT 'activado'
);

-- Tabla de Categorías
CREATE TABLE IF NOT EXISTS categorias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nombre VARCHAR(50) UNIQUE NOT NULL
);

-- Tabla de Productos
CREATE TABLE IF NOT EXISTS productos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    categorias_id UUID REFERENCES categorias(id),
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(1000),
    precio FLOAT NOT NULL CHECK (precio > 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0)
);

-- Tabla de Carrito
CREATE TABLE IF NOT EXISTS carrito (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID UNIQUE REFERENCES usuarios(id) ON DELETE CASCADE,
    estado estadoCarrito DEFAULT 'en_espera',
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Órdenes
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_id VARCHAR(255),
    estado estadoorden DEFAULT 'pendiente',
    precio_total NUMERIC(10, 2) CHECK (precio_total >= 0)
);

-- Tabla de Items del Pedido (Order Item)
CREATE TABLE IF NOT EXISTS orderItem (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    carrito_id UUID REFERENCES carrito(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL, -- Nuevo campo para referenciar la orden
    producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10, 2) NOT NULL,
    preciototal NUMERIC(10, 2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED
);