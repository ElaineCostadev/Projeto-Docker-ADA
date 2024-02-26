CREATE TABLE IF NOT EXISTS todos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  description VARCHAR(255) NOT NULL,
  is_completed BOOLEAN DEFAULT false
);

INSERT INTO todos (description, is_completed) VALUES ('Exemplo 1', false);
INSERT INTO todos (description, is_completed) VALUES ('Exemplo 2', true);


-- CREATE DATABASE IF NOT EXISTS todolist;
-- USE todolist;

-- CREATE TABLE IF NOT EXISTS todos (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   description VARCHAR(255),
--   is_completed BOOLEAN
-- );