-- SQLite
CREATE TABLE jobbs (
name VARCHAR(64) UNIQUE,
descrpition VARCHAR(64),
utbildning VARCHAR(64),
id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);

INSERT INTO jobbs(name, descrpition, utbildning)
    VALUES
    ('Prgramerare', 'Roligt jobb', 'Högskola');




CREATE TABLE tavla (
name VARCHAR(64) UNIQUE,
price INTEGER (64),
info VARCHAR(64),
made VARCHAR(64),
pic VARCHAR(364),
id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL);

INSERT INTO tavla(name,price,info,made,pic)
            VALUES
            ('Korven','299','test','freddie marriage','test');