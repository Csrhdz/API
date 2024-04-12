CREATE DATABASE mysql;

USE mysql;

DROP TABLE IF EXISTS `Usuario`;
CREATE TABLE `mysql`.`Usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  `email` VARCHAR(40) NOT NULL UNIQUE,
  PRIMARY KEY (`id`));

  INSERT INTO Usuarios VALUES
(1, "Erick", "Erick@hotmail.com");

SELECT * FROM Usuarios

SELECT * FROM Usuarios WHERE id = 1;

DELETE FROM Usuarios WHERE id = 2;