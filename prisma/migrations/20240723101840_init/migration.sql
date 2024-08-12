-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organization" VARCHAR(255),
    "tenant" VARCHAR(20) NOT NULL,
    "clientType" VARCHAR(10) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "mobileNo" VARCHAR(20) NOT NULL,
    "officeNo" VARCHAR(20),
    "password" VARCHAR(255) NOT NULL,
    "token" VARCHAR(6) NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "leadId" VARCHAR(36),
    "clientId" VARCHAR(36),

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_tenant_key" ON "Lead"("email", "tenant");
