# LiquiBond

This project is a bond trading dashboard built using [Next.js](https://nextjs.org). It provides users with an interactive interface to view, analyze, and manage bonds. The application includes features like bond details, price history charts, and portfolio summaries.

## Features

- **Dashboard**: Displays a list of bonds with key details like issuer, coupon rate, maturity date, and yield.
- **Bond Details**: View detailed information about a selected bond, including price history and ratings.
- **Portfolio Summary**: Provides an overview of the user's bond holdings and their total value.
- **Interactive Charts**: Visualize bond price trends over time.
- **Buy/Sell Functionality**: Navigate to dedicated pages for buying or selling bonds.

## Novelties

- **Solving the Liquidity Problem**: The platform directly addresses the long-standing issue of low liquidity in the corporate bond market. It transforms an illiquid asset into a tradable one by enabling fractional ownership.

- **Enabling Fractional Ownership**: This is a core innovation. By allowing investors to buy or sell partial bonds, the platform lowers the barrier to entry for retail investors and provides sellers with an easy way to reduce their exposure without having to offload their entire holding.

- **Automated Interest Distribution via Smart Contracts**: A key logistical challenge of fractional ownership is distributing interest payments. Our approach uses smart contracts to automate this process. When the original bond pays interest, the smart contract automatically calculates and disperses the correct percentage to each fractional owner, ensuring a transparent and trustless system.

- **Hybrid Demat-Blockchain Model**: The system combines the security of traditional demat accounts (where the physical bond remains) with the efficiency and transparency of a decentralized blockchain. This hybrid model allows us to create a dynamic secondary market while maintaining compliance and security.

## Architecuture

<img width="1139" height="1096" alt="diagram-export-9-5-2025-11_03_44-PM" src="https://github.com/user-attachments/assets/7afa12c5-5c23-4f2c-8dc0-0ddcc5dfa551" />

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd bond-liquidity-project
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
├── app/
│   ├── buy/[cusip]/
│   ├── sell/[cusip]/
│   ├── layout.tsx
│   ├── page.tsx
├── components/
│   ├── bond-chart.tsx
│   ├── bond-details.tsx
│   ├── bond-table.tsx
│   └── portfolio-summary.tsx
├── src/
│   └── lib/
│       ├── data.ts
│       ├── finance.ts
│       └── types.ts
├── public/
│   ├── assets (SVGs and other static files)
├── README.md
├── package.json
├── tsconfig.json
```

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Data Management**: TypeScript for type safety
- **Charting**: Placeholder for integration with libraries like Recharts or Chart.js

## How to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.
