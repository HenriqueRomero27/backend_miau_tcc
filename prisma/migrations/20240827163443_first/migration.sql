-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "fur" TEXT NOT NULL,
    "furColor" TEXT NOT NULL,
    "temperament" TEXT NOT NULL,
    "neutred" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "photos" TEXT[],
    "adoptionShelterId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionShelter" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "photos" TEXT[],
    "logo" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdoptionShelter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionApplication" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdoptionApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "adoptionShelterId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_adoptionShelterId_key" ON "Address"("adoptionShelterId");

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_adoptionShelterId_fkey" FOREIGN KEY ("adoptionShelterId") REFERENCES "AdoptionShelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionApplication" ADD CONSTRAINT "AdoptionApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionApplication" ADD CONSTRAINT "AdoptionApplication_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_adoptionShelterId_fkey" FOREIGN KEY ("adoptionShelterId") REFERENCES "AdoptionShelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
