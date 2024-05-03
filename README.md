## Getting Started

First, register an account at [FinMind](https://finmindtrade.com/analysis/#/account/register).

Then, add `.env.local` file with the following variables:

```env
FINMIND_USER_ID="your user id"
FINMIND_PASSWORD="your password"
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

I use [Render](https://docs.render.com/web-services) to host the [server](https://taiwan-stock.onrender.com).
