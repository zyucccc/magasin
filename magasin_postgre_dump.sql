

SET timezone = 'UTC';

-- Table: categorie
CREATE TABLE categorie (
                           id SERIAL PRIMARY KEY,
                           nom VARCHAR(100) NOT NULL,
                           description TEXT
);

-- Table: taille
CREATE TABLE taille (
                        id SERIAL PRIMARY KEY,
                        nom VARCHAR(50) NOT NULL
);

-- Table: article
CREATE TABLE article (
                         id SERIAL PRIMARY KEY,
                         nom VARCHAR(255) NOT NULL,
                         prix DECIMAL(10,2) NOT NULL,
                         description TEXT,
                         image VARCHAR(255) DEFAULT NULL,
                         categorie_id INTEGER REFERENCES categorie(id) ON DELETE SET NULL,
                         date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: user
CREATE TABLE "user" (
                        id SERIAL PRIMARY KEY,
                        email VARCHAR(255) NOT NULL UNIQUE,
                        password VARCHAR(255) NOT NULL,
                        nom VARCHAR(100) NOT NULL,
                        prenom VARCHAR(100) NOT NULL,
                        adresse TEXT,
                        code_postal VARCHAR(20) DEFAULT NULL,
                        ville VARCHAR(100) DEFAULT NULL,
                        pays VARCHAR(100) DEFAULT 'France',
                        telephone VARCHAR(20) DEFAULT NULL,
                        is_admin BOOLEAN DEFAULT FALSE,
                        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: statut_commande
CREATE TABLE statut_commande (
                                 id SERIAL PRIMARY KEY,
                                 nom VARCHAR(50) NOT NULL,
                                 description TEXT
);

-- Table: commande
CREATE TABLE commande (
                          id SERIAL PRIMARY KEY,
                          user_id INTEGER NOT NULL REFERENCES "user"(id) ON DELETE RESTRICT,
                          reference VARCHAR(50) NOT NULL UNIQUE,
                          total DECIMAL(10,2) NOT NULL,
                          statut_id INTEGER NOT NULL REFERENCES statut_commande(id) ON DELETE RESTRICT,
                          adresse_livraison TEXT NOT NULL,
                          code_postal_livraison VARCHAR(20) NOT NULL,
                          ville_livraison VARCHAR(100) NOT NULL,
                          pays_livraison VARCHAR(100) NOT NULL DEFAULT 'France',
                          telephone_livraison VARCHAR(20) DEFAULT NULL,
                          date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: panier
CREATE TABLE panier (
                        id SERIAL PRIMARY KEY,
                        user_id INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
                        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: stock
CREATE TABLE stock (
                       id SERIAL PRIMARY KEY,
                       article_id INTEGER NOT NULL REFERENCES article(id) ON DELETE CASCADE,
                       taille_id INTEGER NOT NULL REFERENCES taille(id) ON DELETE CASCADE,
                       quantite INTEGER NOT NULL DEFAULT 0,
                       UNIQUE (article_id, taille_id)
);

-- Table: panier_item
CREATE TABLE panier_item (
                             id SERIAL PRIMARY KEY,
                             panier_id INTEGER NOT NULL REFERENCES panier(id) ON DELETE CASCADE,
                             stock_id INTEGER NOT NULL REFERENCES stock(id) ON DELETE CASCADE,
                             quantite INTEGER NOT NULL DEFAULT 1,
                             date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- donnee

INSERT INTO categorie (id, nom, description) VALUES
                                                 (1, 'Colliers', 'Tous nos colliers en cristaux'),
                                                 (2, 'Bracelets', 'Bracelets en pierres fines et cristaux'),
                                                 (3, 'Bagues', 'Bagues en pierres naturelles'),
                                                 (4, 'Kits de Cristaux', 'Ensembles de cristaux pour guérison et méditation');

SELECT setval('categorie_id_seq', (SELECT MAX(id) FROM categorie));

INSERT INTO taille (id, nom) VALUES
                                 (1, 'XS'),
                                 (2, 'S'),
                                 (3, 'M'),
                                 (4, 'L'),
                                 (5, 'XL'),
                                 (6, 'Unique');

SELECT setval('taille_id_seq', (SELECT MAX(id) FROM taille));

INSERT INTO article (id, nom, prix, description, image, categorie_id, date_creation) VALUES
                                                                                         (1, 'Collier Quartz Rose - Amour et Harmonie', 129.99, 'Le quartz rose est connu comme la pierre de l''amour inconditionnel. Il apporte douceur, tendresse et guérison émotionnelle.', '/collier/collier1.JPG', 1, '2025-02-27 00:21:28'),
                                                                                         (6, 'Bracelet Quartz Clair - Clarté Mentale', 89.99, 'Le quartz clair amplifie l''énergie et la clarté mentale. Il aide à la concentration et à la méditation.', '/bracelet/bracelet1.JPG', 2, '2025-02-27 00:21:28'),
                                                                                         (7, 'Bracelet Turquoise - Guérison et Protection', 99.99, 'La turquoise est une pierre de guérison et de protection. Elle apporte chance et positivité.', '/bracelet/bracelet2.JPG', 2, '2025-02-27 00:21:28'),
                                                                                         (8, 'Bracelet Œil de Tigre - Courage et Confiance', 79.99, 'L''œil de tigre renforce la confiance en soi et le courage. Il aide à prendre des décisions avec discernement.', '/bracelet/bracelet3.JPG', 2, '2025-02-27 00:21:28'),
                                                                                         (11, 'Kit de Méditation - 7 Cristaux Chakras', 129.99, 'Ensemble de 7 cristaux correspondant aux chakras pour équilibrer votre énergie lors de la méditation.', '/christaux/christaux1.JPG', 4, '2025-02-27 00:21:28'),
                                                                                         (12, 'Kit de Guérison - Cristaux Essentiels', 149.99, 'Collection de cristaux essentiels pour la guérison énergétique et le bien-être quotidien.', '/christaux/christaux2.JPG', 4, '2025-02-27 00:21:28');

SELECT setval('article_id_seq', (SELECT MAX(id) FROM article));

INSERT INTO stock (id, article_id, taille_id, quantite) VALUES
                                                            (1, 1, 6, 15),
                                                            (6, 6, 2, 5),
                                                            (7, 6, 3, 8),
                                                            (8, 6, 4, 6),
                                                            (9, 7, 2, 4),
                                                            (10, 7, 3, 7),
                                                            (11, 7, 4, 0),
                                                            (12, 8, 2, 6),
                                                            (13, 8, 3, 9),
                                                            (14, 8, 4, 4),
                                                            (23, 11, 6, 10),
                                                            (24, 12, 6, 6);

SELECT setval('stock_id_seq', (SELECT MAX(id) FROM stock));