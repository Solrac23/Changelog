/*
  Warnings:

  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `profiles` DROP FOREIGN KEY `profiles_user_id_fkey`;

-- DropIndex
DROP INDEX `users_password_key` ON `users`;

-- DropTable
DROP TABLE `profiles`;
