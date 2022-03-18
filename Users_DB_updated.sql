DROP DATABASE IF EXISTS users_db_updated;
CREATE DATABASE users_db_updated; 
USE users_db_updated;

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE Users (
  user_id int NOT NULL AUTO_INCREMENT unique,
  email varchar(500) not null,
  password varchar(500) not null,
  socket_id int not null,
  login_status tinyint not null default '0',
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO users (email, password, socket_id) VALUES ("nvjkfnsxfnsl@gmail", "123456", 11);
INSERT INTO users (email, password, socket_id) VALUES ("nvjkfnsl@gmail", "123456", 22);
INSERT INTO users (email, password, socket_id) VALUES ("fnsxfnsl@gmail", "123456", 33);
INSERT INTO users (email, password, socket_id) VALUES ("nvjkfnsxfnsl@walla", "fhskbk", 44);
INSERT INTO users (email, password, socket_id) VALUES ("nvsl@gmail", "fhskbk", 55);
INSERT INTO users (email, password, socket_id) VALUES ("njjjj@gmail", "123456", 66);

CREATE TABLE Connections (
  user_A_id int NOT NULL,
  user_B_id int NOT NULL,
  connected tinyint not null default '0',
  creation_date date not null,
  last_update date not null,
  PRIMARY KEY (user_A_id, user_B_id),
  foreign key (user_A_id) references Users (user_id),
  foreign key (user_B_id) references Users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO Connections VALUES (1, 2, 1, curdate(), curdate());
INSERT INTO Connections VALUES (2, 3, 0, curdate(), curdate());
INSERT INTO Connections VALUES (1, 3, 0, curdate(), curdate());
INSERT INTO Connections VALUES (2, 1, 1, curdate(), curdate());

CREATE TABLE Chats (
  create_date date not null,
  user_A_id int NOT NULL,
  user_B_id int NOT NULL,
  foreign key (user_A_id) references connections (user_A_id),
  foreign key (user_B_id) references connections (user_B_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO Chats VALUES (curdate(), 2, 3);

CREATE TABLE Notifications (
  notification_id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  content varchar(5000) NOT NULL,
  sent_from int NOT NULL,
  creation_date date NOT NULL,
  seen tinyint not null default '0',
  PRIMARY KEY (notification_id),
  foreign key (user_id) references Users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO Notifications (user_id, content, sent_from, creation_date) VALUES (1, 'You have a new suggestion!', 0, curdate());

CREATE TABLE user_configuration (
  user_id int NOT NULL,
  first_name varchar(100),
  last_name varchar(100),
  date_of_birth DATE,
  city varchar(200),
  gender enum('Woman','Man', 'prefer not to say'), 
  phone_number varchar(11),
  registration_date DATE,
  relationship_status enum('single', 'in a relationship', 'engaged', 'married', 'in an open relationship', 'widowed', 'divorced') default null,
  search_mode enum('whatever', 'beer', 'study', 'food', 'training', 'coffee', 'shopping') default 'whatever',
  sexual_orientation enum('Heterosexual','Bisexual','Homosexual','Pansexual', 'Asexual','prefer not define') default 'prefer not define',
  profession varchar(200),
  pronoun enum('she/her','he/him','they/them','prefer not to say') default 'prefer not to say',
  interested_in set('friends','hookup','short term relationship', 'long term relationship', 'study buddy', 'sport buddy', 'work buddy') default null,
  hobbies set('swimming', 'yoga', 'pilates', 'running', 'surfing', 'dancing', 'cooking', 'baking', 'painting', 'handicraft', 'reading', 'blogging', 'journaling', 'gardening',
  'hiking', 'shopping', 'camping', 'interested in culinary', 'interested in medicine and biology', 'playing video games', 'skippering and sailing', 'traveling', 'slacklining',
  'playing basketball', 'playing football/soccer', 'playing beach volleyball', 'tanning', 'playing tennis', 'going to the gym', 'juggling', 'acting', 'fashion designing', 
  'home decorating', 'puzzeling', 'learning a new languages', 'listening to podcasts', 'singing', 'playing guitar', 'playing synthesizer', 'playing drums', 
  'playing piano', 'playing music', 'any kind of sport!', 'going to restaurants', 'playing chess', 'writing') default null,
  radius int,
  longitude DECIMAL(8,6),
  latitude DECIMAL(8,6),
  PRIMARY KEY (user_id),
  foreign key (user_id) references Users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

 CREATE TABLE Filters (
  user_id int not null,
  hobbies_filter set('swimming', 'yoga', 'pilates', 'running', 'surfing', 'dancing', 'cooking', 'baking', 'painting', 'handicraft', 'reading', 'blogging', 'journaling', 'gardening',
  'hiking', 'shopping', 'camping', 'interested in culinary', 'interested in medicine and biology', 'playing video games', 'skippering and sailing', 'traveling', 'slacklining',
  'playing basketball', 'playing football/soccer', 'playing beach volleyball', 'tanning', 'playing tennis', 'going to the gym', 'juggling', 'acting', 'fashion designing', 
  'home decorating', 'puzzeling', 'learning a new languages', 'listening to podcasts', 'singing', 'playing guitar', 'playing synthesizer', 'playing drums', 
  'playing piano', 'playing music', 'any kind of sport!', 'going to restaurants', 'playing chess', 'writing') default null,
  gender_filter set('men', 'women', 'everyone good for me!') default null,
  relationship_filter enum('single', 'in a relationship', 'engaged', 'married', 'in an open relationship', 'widowed', 'divorced') default null,
  interesting_in_filter set('friends','hookup','short term relationship', 'long term relationship', 'study buddy', 'sport buddy', 'work buddy') default null,
  age_filter enum('16-18', '19-22', '23-27', '28-35', '36-42', '43-50', '51-60', '61-70', '71+') default null,
  primary key (user_id),
  foreign key (user_id) references Users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
insert into Filters values (1, 'yoga,pilates,baking', 2, 1, 'friends,long term relationship,sport buddy', 3);
insert into Filters values (4, 'yoga,pilates,baking,hiking,surfing', 2, 1, 'short term relationship,long term relationship,sport buddy', 3);
insert into Filters values (5, 'pilates,baking,hiking,surfing', 2, 1, 'friends,long term relationship,sport buddy', 3);
insert into Filters values (2, 'pilates,writing', 3, 2, 'short term relationship,study buddy', 3);
insert into Filters values (3, 'baking,playing guitar', 2, 2, 'work buddy,friends', 3);

 CREATE TABLE User_pictures (
  user_id int not null,
  image varchar(50),
  main_image enum('0', '1'),
  primary key (user_id),
  foreign key (user_id) references Users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;