-- CreateTable
CREATE TABLE `changelogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `versao` VARCHAR(191) NOT NULL,
    `date` DATE NOT NULL,
    `descricao` VARCHAR(191) NULL,
    `major_changes` VARCHAR(191) NULL,
    `major_changes_check` BOOLEAN NULL,
    `changed_features` VARCHAR(191) NULL,
    `changed_features_check` BOOLEAN NULL,
    `fix` VARCHAR(191) NULL,
    `fix_check` BOOLEAN NULL,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` BOOLEAN NOT NULL DEFAULT false,
    `company_id` INTEGER NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_password_key`(`password`),
    UNIQUE INDEX `users_company_id_key`(`company_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companys` (
    `id_company` INTEGER NOT NULL AUTO_INCREMENT,
    `nameCompany` VARCHAR(191) NOT NULL,
    `uf` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_company`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `changelogs` ADD CONSTRAINT `changelogs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_company_id_fkey` FOREIGN KEY (`company_id`) REFERENCES `companys`(`id_company`) ON DELETE RESTRICT ON UPDATE CASCADE;

