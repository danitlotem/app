DROP DATABASE IF EXISTS users_db_updated;
CREATE DATABASE users_db_updated; 
USE users_db_updated;

SET NAMES utf8 ;
SET character_set_client = utf8mb4 ;

CREATE TABLE Users (
  user_id int NOT NULL AUTO_INCREMENT,
  email varchar(500),
  password varchar(500),
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE Chats (
  create_date date NOT NULL,
  user_A_id int NOT NULL,
  user_B_id int NOT NULL,
  PRIMARY KEY (user_A_id, user_B_id),
  foreign key (user_A_id) references Users (user_id),
  foreign key (user_B_id) references Users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

 CREATE TABLE User_pictures (
  user_id int not null,
  image varchar(1000),
  main_image enum('0', '1'),
  foreign key (user_id) references Users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;