# Bruno API collection

Open the `bruno` folder in Bruno and select the `local` environment. Start the NestJS API with `npm run start:dev` first.

The register, login, and refresh-token requests save returned tokens to the environment for later use.

The current application does not register authentication guards on the city, country, or currency controllers, so those requests do not require an Authorization header.
