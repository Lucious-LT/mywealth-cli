# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.


## Generating the Open API client

### To install the openapi-generator-cli
`npm install openapi-typescript-codegen --save-dev`

### To generate the client 
`openapi --input http://localhost:8897/crm/v3/api-docs --client axios --name CrmApiModule --output src/server/api/models/crm`
`openapi --input http://localhost:9008/treasury/q/openapi --client axios --name TreasuryApiModule --output src/server/api/models/treasury`
`openapi --input http://localhost:9010/funds/q/openapi --client axios --name FundsApiModule --output src/server/api/models/funds`
`openapi --input http://localhost:8898/investing/v3/api-docs --client axios --name InvestingApiModule --output src/server/api/models/investing`
`openapi --input http://localhost:9001/accounting/q/openapi  --client axios --name AccountingApiModule --output src/server/api/models/accounting`
`openapi --input http://localhost:9003/banking/q/openapi  --client axios --name BankingApiModule --output src/server/api/models/banking`
`openapi --input http://localhost:9007/reports/q/openapi  --client axios --name ReportsApiModule --output src/server/api/models/reports`
`openapi --input http://localhost:9004/insurance/q/openapi  --client axios --name InsuranceApiModule --output src/server/api/models/insurance`
`openapi --input http://localhost:9000/position/q/openapi  --client axios --name PositionApiModule --output src/server/api/models/position`
`openapi --input http://localhost:8899/communication/v3/api-docs --client axios --name CommunicationApiModule --output src/server/api/models/communication`
`openapi --input http://localhost:9002/administration/q/openapi --client axios --name AdministrationApiModule --output src/server/api/models/administration`

