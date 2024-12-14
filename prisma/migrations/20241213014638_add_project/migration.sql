-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `price` DOUBLE NULL,
    `stoke` INTEGER NULL,
    `idUser` INTEGER NULL,

    INDEX `idUser_idx`(`idUser`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rol` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NULL,
    `email` VARCHAR(45) NULL,
    `password` VARCHAR(256) NULL,
    `idRol` INTEGER NULL,

    INDEX `idRol_idx`(`idRol`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `idUser` FOREIGN KEY (`idUser`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `idRol` FOREIGN KEY (`idRol`) REFERENCES `Rol`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
