drop table if exists user;
create table user (
    id int(11) not null auto_increment,
    email varchar(255) not null,
    token text not null,
    wordCount int not null default 0,
    premium int not null default 0,
    lastUse varchar(20) not null default current_date,
    primary key (id)
);

-- tuple utile pour les tests unitaires
INSERT INTO `user` VALUES 
(1,'azerty@aze.fr','un_token',319,0,'2021-01-25'),
(2,'qwert@qwe.fr','un_token',638,0,'2021-01-25');