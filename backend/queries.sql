CREATE TABLE ad 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    owner VARCHAR(100) NOT NULL,
    price INT,
    picture VARCHAR(100),
    location VARCHAR(100),
    createdAt DATE
);


INSERT INTO ad (title, description, owner, price, picture, location, createdAt) VALUES
('Rollers', 'Not sure they can be used anymore, have fun with them', 'car@car.fr', 10, 'https://lien.com', 'Bordeaux', '2023-9-01'),
('Skate', 'I bought this skate with Tony Hawks signature, ', 'test@test.fr', 5800, 'https://lien.com', 'Paris', '2023-9-01'),
('Red Bike', 'Electric Red Bike to sold.', 'machin@machin.fr', 500, 'https://lien.com', 'Lyon', '2023-9-01'),
('Yellow Car', 'I do not like my car anymore', 'truc@truc.fr', 10000, 'https://lien.com', 'Lyon', '2023-9-01'),
('Brand New Car', 'Bought this car yesterday, but have to move in another country.', 'bidule@bidule.fr', 36000, 'https://lien.com', 'Paris', '2023-9-15'),
('Car', 'This is a Car that i do not use anymore', 'chouette@chouette.fr', 3600, 'https://lien.com', 'Lyon', '2023-9-06'),
('New Bike', 'My Brand New Bike is ready for you!', 'bike@bike.fr', 600, 'https://lien.com', 'Bordeaux', '2023-9-07'),
('Skate', 'This is my old skate!', 'superskate@skate.fr', 39, 'https://lien.com', 'Lyon', '2023-9-05'),
('Cushion', 'This is a homemade cushion.', 'cushion@cushion.fr', 41, 'https://lien.com', 'Paris', '2023-9-11'),
('Black Cushion', 'This is a black cushion', 'blackcushion@cushion.fr', 40, 'https://lien.com', 'Lyon', '2023-9-05'),
('Set of Glasses', 'This is a set of glasses that i do not use anymore', 'car@car.fr', 22, 'https://lien.com', 'Bordeaux', '2023-9-03'),
('Set of Plates', 'This is a set of plates that i do not use anymore', 'car@car.fr', 20, 'https://lien.com', 'Paris', '2023-9-05'),
('Manga Vol 1', 'This is Vol 1 of Manga.', 'manga@manga.fr', 8, 'https://lien.com', 'Lyon', '2023-9-05'),
('Manga Vol 2', 'This is Vol 2 of Manga.', 'manga@manga.fr', 5, 'https://lien.com', 'Bordeaux', '2023-9-02'),
('Manga Vol 3', 'This is Vol 3 of Manga.', 'manga@manga.fr', 4, 'https://lien.com', 'Lyon', '2023-9-05'),
('Manga Vol 4', 'This is Vol 4 of Manga.', 'manga@manga.fr', 5, 'https://lien.com', 'Bordeaux', '2023-9-01'),
('Old Cushion', 'This is an old cushion that i do not use anymore', 'oldcushion@cushion.fr', 12, 'https://lien.com', 'Lyon', '2023-9-05'),
('Collector Manga Vol 7', 'This is Vol 7 of Manga, collector version.', 'manga@manga.fr', 27, 'https://lien.com', 'Paris', '2023-9-06'),
('Collector Manga Vol 18', 'This is Vol 8 of Manga, collector version.', 'manga@manga.fr', 28, 'https://lien.com', 'Bordeaux', '2023-9-07'),
('Really Old Car', 'My car is pretty old, maybe you could use it.', 'oldcar@car.fr', 300, 'https://lien.com', 'Bordeaux', '2023-9-01');

SELECT * FROM ad;

SELECT * FROM ad WHERE location = 'Bordeaux';

Delete FROM ad WHERE price > 40;

UPDATE ad SET price = 0 WHERE createdAt = '2023-9-01';

SELECT AVG(price), location FROM ad WHERE location = 'Paris';

SELECT AVG(price), location FROM ad GROUP BY location;