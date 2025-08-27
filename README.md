# GitHub Search App
![GitHub Search App Landing Page](https://github-search-app-ochre.vercel.app/images/landing-page-screenshot.png)
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) that allows users to search for GitHub profiles and view their repositories and contribution statistics.

## Getting Started

### Environment Setup

1. Create a `.env.local` file in the root directory with your GitHub token:
   ```
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token
   ```
   You can create a GitHub personal access token by following the instructions [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

2. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

The application is deployed on Vercel at [https://github-search-ezr3xovvx-anwar-mohammed-kojis-projects.vercel.app](https://github-search-ezr3xovvx-anwar-mohammed-kojis-projects.vercel.app).

### Known Issues

- The deployed application requires a GitHub personal access token to authenticate API requests. Without this token, the application will return a 401 Unauthorized status code due to GitHub API rate limits for unauthenticated requests.

### Deployment Steps

1. Set up environment variables in Vercel:
   - Go to your project settings in the Vercel dashboard
   - Add the `NEXT_PUBLIC_GITHUB_TOKEN` environment variable with your GitHub personal access token

2. Build the application:
   ```bash
   npm run build
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

### GitHub API Rate Limiting

The application uses the GitHub API directly. Please be aware of the [GitHub API rate limits](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting) for unauthenticated requests (60 requests per hour).
