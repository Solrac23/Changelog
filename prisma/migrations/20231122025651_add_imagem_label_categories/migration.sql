/*
  Warnings:

  - You are about to drop the column `changed_features` on the `changelogs` table. All the data in the column will be lost.
  - You are about to drop the column `changed_features_check` on the `changelogs` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `changelogs` table. All the data in the column will be lost.
  - You are about to drop the column `fix` on the `changelogs` table. All the data in the column will be lost.
  - You are about to drop the column `fix_check` on the `changelogs` table. All the data in the column will be lost.
  - You are about to drop the column `major_changes` on the `changelogs` table. All the data in the column will be lost.
  - You are about to drop the column `major_changes_check` on the `changelogs` table. All the data in the column will be lost.
  - You are about to drop the column `nameCompany` on the `companys` table. All the data in the column will be lost.
  - Added the required column `categories_id` to the `changelogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label_id` to the `changelogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CompanyName` to the `companys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `companys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `changelogs` DROP COLUMN `changed_features`,
    DROP COLUMN `changed_features_check`,
    DROP COLUMN `description`,
    DROP COLUMN `fix`,
    DROP COLUMN `fix_check`,
    DROP COLUMN `major_changes`,
    DROP COLUMN `major_changes_check`,
    ADD COLUMN `categories_id` INTEGER NOT NULL,
    ADD COLUMN `label_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `companys` 
    RENAME COLUMN `nameCompany` TO `CompanyName`,
    ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` LONGTEXT NULL,
    `category` VARCHAR(500) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `labels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(12) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `labels_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagem` (
    `id` VARCHAR(191) NOT NULL,
    `path` VARCHAR(500) NOT NULL,
    `changelog_id` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `changelogs` ADD CONSTRAINT `changelogs_label_id_fkey` FOREIGN KEY (`label_id`) REFERENCES `labels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `changelogs` ADD CONSTRAINT `changelogs_categories_id_fkey` FOREIGN KEY (`categories_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `imagem` ADD CONSTRAINT `imagem_changelog_id_fkey` FOREIGN KEY (`changelog_id`) REFERENCES `changelogs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
