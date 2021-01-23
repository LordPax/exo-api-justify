drop table if exists user;
create table user (
    id int(11) not null auto_increment,
    email varchar(255) not null,
    token text not null,
    wordCount int not null default 0,
    premium int not null default 0,
    primary key (id)
);