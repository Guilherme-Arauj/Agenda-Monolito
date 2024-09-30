/*
  Warnings:

  - You are about to drop the column `endereco` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `idade` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `observacao` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `redeSocial` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `address` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialMedia` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contact` DROP COLUMN `endereco`,
    DROP COLUMN `idade`,
    DROP COLUMN `nome`,
    DROP COLUMN `observacao`,
    DROP COLUMN `redeSocial`,
    DROP COLUMN `telefone`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `age` INTEGER NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `note` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `socialMedia` VARCHAR(191) NOT NULL;
