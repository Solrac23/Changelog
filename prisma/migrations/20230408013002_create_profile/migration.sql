/*
  Warnings:

  - You are about to drop the column `descricao` on the `changelogs` table. All the data in the column will be lost.
  - You are about to drop the column `versao` on the `changelogs` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `users` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(0))`.
  - Added the required column `updateAt` to the `changelogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `changelogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `changelogs` 
    RENAME COLUMN `descricao` TO `description`,
    RENAME COLUMN `versao` TO `version`,
    ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL,
    MODIFY `date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `profiles_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
