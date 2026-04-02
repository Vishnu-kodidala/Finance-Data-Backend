-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FinanceRecord" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "notes" TEXT,
    "userId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FinanceRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FinanceRecord" ("amount", "category", "createdAt", "date", "id", "notes", "type", "userId") SELECT "amount", "category", "createdAt", "date", "id", "notes", "type", "userId" FROM "FinanceRecord";
DROP TABLE "FinanceRecord";
ALTER TABLE "new_FinanceRecord" RENAME TO "FinanceRecord";
PRAGMA foreign_key_check("FinanceRecord");
PRAGMA foreign_keys=ON;
