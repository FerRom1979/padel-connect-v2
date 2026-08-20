-- CreateEnum
CREATE TYPE "PlayerCategory" AS ENUM ('C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7');

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "maxLevel",
DROP COLUMN "minLevel",
ADD COLUMN     "categories" "PlayerCategory"[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "level",
ADD COLUMN     "category" "PlayerCategory";

