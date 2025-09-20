CREATE DATABASE todo_db;
CREATE USER 'todo_user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON todo_db.* TO 'todo_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;


-- 
CREATE USER 'remoteuser'@'%' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON testdb.* TO 'remoteuser'@'%';