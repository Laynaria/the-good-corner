DROP TABLE ad;

CREATE TABLE category
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100)
);

CREATE TABLE ad 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    owner VARCHAR(100) NOT NULL,
    price INT,
    picture VARCHAR(100),
    location VARCHAR(100),
    createdAt DATE, 
    category_id INTEGER NOT NULL,
    CONSTRAINT FK_category
    FOREIGN KEY (category_id) REFERENCES category(id)
);

INSERT INTO category (name) VALUES
('vêtement'),
('voiture'),
('autre');

INSERT INTO category (name) VALUES
('outil'),
('décoration');

INSERT INTO tag (name) VALUES
('voiture'),
('skate'),
('vaisselle');

INSERT INTO ad (title, description, owner, price, picture, location, createdAt, categoryId) VALUES
('Rollers', 'Not sure they can be used anymore, have fun with them', 'car@car.fr', 10, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', '2023-9-01', 3),
('Skate', 'I bought this skate with Tony Hawks signature, ', 'test@test.fr', 5800, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Paris', '2023-9-01', 3),
('Red Bike', 'Electric Red Bike to sold.', 'machin@machin.fr', 500, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Lyon', '2023-9-01', 3),
('Yellow Car', 'I do not like my car anymore', 'truc@truc.fr', 10000, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Lyon', '2023-9-01', 2),
('Brand New Car', 'Bought this car yesterday, but have to move in another country.', 'bidule@bidule.fr', 36000, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Paris', '2023-9-15', 2),
('Car', 'This is a Car that i do not use anymore', 'chouette@chouette.fr', 3600, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Lyon', '2023-9-06', 2),
('New Bike', 'My Brand New Bike is ready for you!', 'bike@bike.fr', 600, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', '2023-9-07', 3),
('Skate', 'This is my old skate!', 'superskate@skate.fr', 39, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Lyon', '2023-9-05', 3),
('Cushion', 'This is a homemade cushion.', 'cushion@cushion.fr', 41, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Paris', '2023-9-11', 3),
('Black Cushion', 'This is a black cushion', 'blackcushion@cushion.fr', 40, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Lyon', '2023-9-05', 3),
('T-Shirt', 'Selling a T-Shirt', 'shirt@shirt.fr', 22, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', '2023-9-03', 1),
('Set of Plates', 'This is a set of plates that i do not use anymore', 'car@car.fr', 20, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Paris', '2023-9-05', 3),
('Manga Vol 1', 'This is Vol 1 of Manga.', 'manga@manga.fr', 8, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Lyon', '2023-9-05', 3),
('Manga Vol 2', 'This is Vol 2 of Manga.', 'manga@manga.fr', 5, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', '2023-9-02', 3),
('Manga Vol 3', 'This is Vol 3 of Manga.', 'manga@manga.fr', 4, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Lyon', '2023-9-05', 3),
('Manga Vol 4', 'This is Vol 4 of Manga.', 'manga@manga.fr', 5, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', '2023-9-01', 3),
('Old Cushion', 'This is an old cushion that i do not use anymore', 'oldcushion@cushion.fr', 12, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Lyon', '2023-9-05', 3),
('Collector Manga Vol 7', 'This is Vol 7 of Manga, collector version.', 'manga@manga.fr', 27, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Paris', '2023-9-06', 3),
('Collector Manga Vol 18', 'This is Vol 8 of Manga, collector version.', 'manga@manga.fr', 28, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', '2023-9-07', 3),
('Really Old Car', 'My car is pretty old, maybe you could use it.', 'oldcar@car.fr', 300, 'https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000', 'Bordeaux', '2023-9-01', 2);

SELECT * FROM ad;

SELECT * FROM ad WHERE location = 'Bordeaux';

Delete FROM ad WHERE price > 40;

UPDATE ad SET price = 0 WHERE createdAt = '2023-9-01';

SELECT AVG(price), location FROM ad WHERE location = 'Paris';

SELECT AVG(price), location FROM ad GROUP BY location;

-- Part 2

SELECT * FROM ad WHERE category_id = 1;
SELECT * FROM ad INNER JOIN category AS c ON ad.category_id = c.id WHERE c.name = 'vêtement';

SELECT * FROM ad WHERE category_id = 1 OR category_id = 2;
SELECT * FROM ad INNER JOIN category AS c ON ad.category_id = c.id WHERE c.name = 'vêtement' OR c.name = 'voiture';

SELECT AVG(price) FROM ad WHERE category_id = 3;
SELECT AVG(price), c.name FROM ad INNER JOIN category AS c ON ad.category_id = c.id WHERE c.name = 'autre';

SELECT * FROM ad INNER JOIN category AS c ON ad.category_id = c.id WHERE c.name LIKE 'v%';