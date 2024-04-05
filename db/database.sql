CREATE DATABASE companydb;

use companydb;

CREATE TABLE employee(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(11) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY (id)
);


DESCRIBE employee;

INSERT INTO employee VALUES 
(1, 'Mariano',1000),
(2, 'Andres',2000),
(3, 'juan',4000),
(4, 'Alex',5000)
