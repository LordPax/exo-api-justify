drop table if exists user;
create table user (
    id int(11) not null auto_increment,
    email varchar(255) not null,
    token text not null,
    wordCount int not null default 0,
    premium int not null default 0,
    primary key (id)
);

INSERT INTO user VALUES (1,'azerty@aze.fr','lmqskdfmqsldkf',0,0),(13,'qwert@qwe.fr','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF3ZXJ0QHF3ZS5mciIsImlhdCI6MTYxMTUwODY4MH0.4eMFiL13o5MA2G-xWS9Y68CfrA95TZ6GEUhgQNf1ULY',978,0);