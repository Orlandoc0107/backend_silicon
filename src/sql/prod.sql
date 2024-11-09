-- Inserta categorías solo si no existen para evitar duplicados
INSERT INTO categorias (nombre) 
VALUES ('gaseosas')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO categorias (nombre) 
VALUES ('agua')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO categorias (nombre) 
VALUES ('vinos')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO categorias (nombre) 
VALUES ('cervezas')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO categorias (nombre) 
VALUES ('aperitivos')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO categorias (nombre) 
VALUES ('comida_rapida')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO categorias (nombre) 
VALUES ('comida_congelada')
ON CONFLICT (nombre) DO NOTHING;

-- Insertar productos
-- Inserta productos solo si la categoría existe, evitando duplicados en el nombre
INSERT INTO productos (nombre, descripcion, precio, stock, categorias_id) 
VALUES
    ('Coca-Cola', 'Coca-Cola de 2.25L', 90.50, 15, (SELECT id FROM categorias WHERE nombre = 'gaseosas')),
    ('Pepsi', 'Pepsi de 2.25L', 90.50, 15, (SELECT id FROM categorias WHERE nombre = 'gaseosas')),
    ('Sprite', 'Sprite de 2.25L', 85.00, 15, (SELECT id FROM categorias WHERE nombre = 'gaseosas')),
    ('Agua Mineral', 'Agua sin gas de 500 ml', 40.00, 15, (SELECT id FROM categorias WHERE nombre = 'agua')),
    ('Agua con Gas', 'Agua con gas de 500 ml', 70.00, 15, (SELECT id FROM categorias WHERE nombre = 'agua')),
    ('Santa Julia', 'Santa Julia Blanco de 750 ml', 180.00, 15, (SELECT id FROM categorias WHERE nombre = 'vinos')),
    ('Estancia Mendoza', 'Estancia Mendoza Malbec 750ml', 190.00, 15, (SELECT id FROM categorias WHERE nombre = 'vinos')),
    ('Trumpeter', 'Tinto Trumpeter Malbec 750ml', 200.00, 15, (SELECT id FROM categorias WHERE nombre = 'vinos')),
    ('Patagonia', 'Patagonia Bohemian Pilsener lata 473ml', 150.00, 15, (SELECT id FROM categorias WHERE nombre = 'cervezas')),
    ('Brahma', 'Cerveza Brahma lata 473ml', 140.00, 15, (SELECT id FROM categorias WHERE nombre = 'cervezas')),
    ('Heineken', 'Cerveza Heineken Botella 330ml', 170.00, 15, (SELECT id FROM categorias WHERE nombre = 'cervezas')),
    ('Fernet 450ml', 'Fernet Branca 450 ml', 250.00, 15, (SELECT id FROM categorias WHERE nombre = 'aperitivos')),
    ('Fernet 750ml', 'Fernet Branca 750 ml', 300.00, 15, (SELECT id FROM categorias WHERE nombre = 'aperitivos')),
    ('Campari', 'Campari Aperitivo de 750ml', 300.00, 15, (SELECT id FROM categorias WHERE nombre = 'aperitivos')),
    ('Lays Clasicas', 'Papas Fritas Lays Clasicas 134gr', 50.00, 15, (SELECT id FROM categorias WHERE nombre = 'comida_rapida')),
    ('Saladix Jamón', 'Galletitas Saladix Jamón 100gr', 30.00, 15, (SELECT id FROM categorias WHERE nombre = 'comida_rapida')),
    ('Pizza Congelada Mediana Jamón y Queso', 'Pizza Congelada Mediana Jamón y Queso 12 porciones', 200.00, 15, (SELECT id FROM categorias WHERE nombre = 'comida_congelada')),
    ('Ñoquis Congelados Chicos', 'Bandeja de Ñoquis Congelados Chica 250gr', 150.00, 15, (SELECT id FROM categorias WHERE nombre = 'comida_congelada'))
ON CONFLICT (nombre) DO NOTHING;

