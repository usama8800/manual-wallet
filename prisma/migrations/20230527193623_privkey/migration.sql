/*
  Warnings:

  - Added the required column `privateKey` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wallet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "networkSymbol" TEXT NOT NULL,
    CONSTRAINT "Wallet_networkSymbol_fkey" FOREIGN KEY ("networkSymbol") REFERENCES "Network" ("symbol") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Wallet" ("address", "id", "name", "networkSymbol", "privateKey") SELECT "address", "id", "name", "networkSymbol", '' FROM "Wallet";
DROP TABLE "Wallet";
ALTER TABLE "new_Wallet" RENAME TO "Wallet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
