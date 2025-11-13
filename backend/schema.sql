CREATE DATABASE chat_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE chat_app;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL
);

CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME NOT NULL,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  created_at DATETIME NOT NULL
);

CREATE TABLE study_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('exam','study','memo') NOT NULL,
  name VARCHAR(255),
  date DATE,
  hours DECIMAL(4,2),
  content TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
