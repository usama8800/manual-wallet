-- CreateTable
CREATE TABLE "Network" (
    "symbol" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "networkSymbol" TEXT NOT NULL,
    CONSTRAINT "Wallet_networkSymbol_fkey" FOREIGN KEY ("networkSymbol") REFERENCES "Network" ("symbol") ON DELETE RESTRICT ON UPDATE CASCADE
);
