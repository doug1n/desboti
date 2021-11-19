USE boticario;


DROP TABLE IF EXISTS purchases;


DROP TABLE IF EXISTS sellers;


CREATE TABLE purchases
(
    id         int,
    code       int                     NOT NULL,
    value      decimal(10, 2)          NOT NULL,
    date       date                    NOT NULL,
    cpf        varchar(11)             NOT NULL,
    status     int                     NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);


CREATE UNIQUE INDEX purchases_id_uindex ON purchases (id);


ALTER TABLE purchases
    ADD CONSTRAINT purchases_pk PRIMARY KEY (id);


ALTER TABLE purchases
    MODIFY id int AUTO_INCREMENT;


CREATE TABLE sellers
(
    id         int,
    fullName   varchar(255)            NOT NULL,
    cpf        varchar(11)             NOT NULL,
    email      varchar(80)             NOT NULL,
    password   varchar(255)            NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);


CREATE UNIQUE INDEX sellers_id_uindex ON sellers (id);


ALTER TABLE sellers
    ADD CONSTRAINT sellers_pk PRIMARY KEY (id);


ALTER TABLE sellers
    MODIFY id int AUTO_INCREMENT;