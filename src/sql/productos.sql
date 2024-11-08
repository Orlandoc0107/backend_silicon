-- Insertar productos ficticios en la tabla productos solo si no existen
-- Bebidas
DO $$ 
BEGIN
    -- Solo inserta si no existe el producto
    IF NOT EXISTS (SELECT 1 FROM productos WHERE name = 'Coca-Cola') THEN
        INSERT INTO productos (name, descripcion, precio, stock) 
        VALUES ('Coca-Cola', 'Bebida gaseosa refrescante de cola.', 90.50, 150);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM productos WHERE name = 'Fanta') THEN
        INSERT INTO productos (name, descripcion, precio, stock) 
        VALUES ('Fanta', 'Bebida gaseosa sabor naranja.', 80.75, 200);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM productos WHERE name = 'Sprite') THEN
        INSERT INTO productos (name, descripcion, precio, stock) 
        VALUES ('Sprite', 'Bebida gaseosa sabor limón.', 85.00, 180);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM productos WHERE name = 'Tereré') THEN
        INSERT INTO productos (name, descripcion, precio, stock) 
        VALUES ('Tereré', 'Infusión típica argentina con yerba mate, ideal para beber fría.', 60.00, 120);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM productos WHERE name = 'Agua Mineral') THEN
        INSERT INTO productos (name, descripcion, precio, stock) 
        VALUES ('Agua Mineral', 'Agua mineral natural sin gas.', 40.00, 300);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM productos WHERE name = 'Cerveza Quilmes') THEN
        INSERT INTO productos (name, descripcion, precio, stock) 
        VALUES ('Cerveza Quilmes', 'Cerveza rubia argentina, marca Quilmes.', 150.00, 100);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM productos WHERE name = 'Club Soda') THEN
        INSERT INTO productos (name, descripcion, precio, stock) 
        VALUES ('Club Soda', 'Agua con gas ideal para combinar con tragos.', 70.00, 250);
    END IF;
    
    -- Alimentos congelados
    IF NOT EXISTS (SELECT 1 FROM productos WHERE name = 'Pizzas Frozen') THEN
        INSERT INTO productos (name, descripcion, precio, stock) 
        VALUES ('Pizzas Frozen', 'Pizza congelada de diversos sabores: muzzarella, jamón y morrones.', 250.00, 50);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM productos WHERE name = 'Empanadas de Carne') THEN
        INSERT INTO productos (name, descripcion, precio, stock) 
        VALUES ('Empanadas de Carne', 'Empanadas de carne congeladas, listas para freír o hornear.', 120.00, 200);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM productos WHERE name = 'Milanesas de Pollo') THEN
        INSERT INTO productos (name, descripcion, precio, stock) 
        VALUES ('Milanesas de Pollo', 'Milanesas de pollo congeladas empanadas, listas para freír.', 200.00, 75);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM productos WHERE name = 'Croquetas de Pollo') THEN
        INSERT INTO productos (name, descripcion, precio, stock) 
        VALUES ('Croquetas de Pollo', 'Croquetas de pollo congeladas, fáciles de preparar.', 150.00, 100);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM productos WHERE name = 'Papas Fritas Congeladas') THEN
        INSERT INTO productos (name, descripcion, precio, stock) 
        VALUES ('Papas Fritas Congeladas', 'Papas fritas congeladas, listas para freír.', 120.00, 180);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM productos WHERE name = 'Helado') THEN
        INSERT INTO productos (name, descripcion, precio, stock) 
        VALUES ('Helado', 'Helado en barra de diferentes sabores: vainilla, chocolate, frutilla.', 400.00, 80);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM productos WHERE name = 'Pre-Pizzas') THEN
        INSERT INTO productos (name, descripcion, precio, stock) 
        VALUES ('Pre-Pizzas', 'Pre-pizzas congeladas listas para ser cocidas.', 230.00, 60);
    END IF;
END $$;