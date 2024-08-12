-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,
    "tenant" VARCHAR(20) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255),
    "image" VARCHAR(255),
    "clientId" VARCHAR(36) NOT NULL,
    "clientCode" VARCHAR(20) NOT NULL,
    "clientLabel" VARCHAR(255) NOT NULL,
    "contactId" VARCHAR(36) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "type" VARCHAR(20) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "productId" VARCHAR(36) NOT NULL,
    "productCode" VARCHAR(20) NOT NULL,
    "clientId" VARCHAR(36) NOT NULL,
    "accountId" VARCHAR(36) NOT NULL,
    "accountNo" VARCHAR(20) NOT NULL,
    "accountLabel" VARCHAR(255) NOT NULL,
    "balanceTime" VARCHAR(255),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beneficiary" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "destinationType" VARCHAR(20) NOT NULL,
    "destAccountNo" VARCHAR(20) NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "destAccountLabel" VARCHAR(255) NOT NULL,
    "institutionId" VARCHAR(36) NOT NULL,
    "institutionCode" VARCHAR(36) NOT NULL,
    "institutionLabel" VARCHAR(100) NOT NULL,

    CONSTRAINT "Beneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "destinationType" VARCHAR(20) NOT NULL,
    "srcAccountNo" VARCHAR(20) NOT NULL,
    "srcAccountType" VARCHAR(20) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "srcAccountLabel" VARCHAR(255) NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "amount" DECIMAL(19,2) NOT NULL,
    "destAccountNo" VARCHAR(20) NOT NULL,
    "destAccountLabel" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "institutionId" VARCHAR(36) NOT NULL,
    "institutionCode" VARCHAR(36) NOT NULL,
    "institutionLabel" VARCHAR(100) NOT NULL,
    "reference" VARCHAR(255),
    "idempotencyKey" VARCHAR(36) NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillSchedule" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "billType" VARCHAR(20) NOT NULL,
    "biller" VARCHAR(20) NOT NULL,
    "paymentFrequency" VARCHAR(20) NOT NULL,
    "srcAccountLabel" VARCHAR(255) NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "amount" DECIMAL(19,2) NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "reference" VARCHAR(255),
    "idempotencyKey" VARCHAR(36) NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Account_accountId_clientId_key" ON "Account"("accountId", "clientId");

-- CreateIndex
CREATE INDEX "beneficiary_user_id_idx" ON "Beneficiary"("userId", "destAccountLabel");

-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_userId_institutionId_destAccountNo_key" ON "Beneficiary"("userId", "institutionId", "destAccountNo");

-- CreateIndex
CREATE INDEX "transfer_user_id_idx" ON "Transfer"("userId", "transactionDate");

-- CreateIndex
CREATE INDEX "bill_schedule_user_id_idx" ON "BillSchedule"("userId", "transactionDate");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beneficiary" ADD CONSTRAINT "Beneficiary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillSchedule" ADD CONSTRAINT "BillSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
