CREATE SCHEMA `vacations` ;

CREATE TABLE `vacations`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(15) NOT NULL,
  `last_name` VARCHAR(15) NOT NULL,
  `user_name` VARCHAR(25) NOT NULL,
  `password` VARCHAR(25) NOT NULL,
  `role` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE);


CREATE TABLE `vacations`.`vacations_plans` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `description` MEDIUMTEXT NOT NULL,
  `destiny` VARCHAR(45) NOT NULL,
  `from` DATE NOT NULL,
  `to` DATE NOT NULL,
  `price` INT UNSIGNED NOT NULL,
  `followers` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

CREATE TABLE `vacations`.`followed_vacations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `follower_id` INT UNSIGNED NOT NULL,
  `vacation_followed_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `follower_id`, `vacation_followed_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `follower_id_UNIQUE` (`follower_id` ASC) VISIBLE,
  UNIQUE INDEX `vacation_followed_id_UNIQUE` (`vacation_followed_id` ASC) VISIBLE,
  CONSTRAINT `FK_FOLLOWER`
    FOREIGN KEY (`follower_id`)
    REFERENCES `vacations`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- ALTERATIONS

ALTER TABLE `vacations`.`followed_vacations` 
ADD CONSTRAINT `FK_FOLLOWED_VACATION`
  FOREIGN KEY (`vacation_followed_id`)
  REFERENCES `vacations`.`vacations_plans` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `vacations`.`users` 
CHANGE COLUMN `password` `password` VARCHAR(100) NOT NULL ;

ALTER TABLE `vacations`.`vacations_plans` 
DROP COLUMN `followers`,
CHANGE COLUMN `destiny` `destination` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `from` `from` VARCHAR(20) NOT NULL ,
CHANGE COLUMN `to` `to` VARCHAR(20) NOT NULL ;

ALTER TABLE `vacations`.`followed_vacations` 
DROP FOREIGN KEY `FK_FOLLOWER`,
DROP FOREIGN KEY `FK_FOLLOWED_VACATION`;
ALTER TABLE `vacations`.`followed_vacations` 
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id`),
DROP INDEX `vacation_followed_id_UNIQUE` ,
DROP INDEX `follower_id_UNIQUE` ;
;

ALTER TABLE `vacations`.`followed_vacations` 
ADD INDEX `FK_FOLLOWER_ID_idx` (`follower_id` ASC) VISIBLE,
ADD INDEX `FK_FOLLOWED_VACATION_idx` (`vacation_followed_id` ASC) VISIBLE;
;
ALTER TABLE `vacations`.`followed_vacations` 
ADD CONSTRAINT `FK_FOLLOWER_ID`
  FOREIGN KEY (`follower_id`)
  REFERENCES `vacations`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_FOLLOWED_VACATION`
  FOREIGN KEY (`vacation_followed_id`)
  REFERENCES `vacations`.`vacations_plans` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


ALTER TABLE `vacations`.`vacations_plans` 
ADD COLUMN `imageFileName` VARCHAR(60) NOT NULL AFTER `price`;
