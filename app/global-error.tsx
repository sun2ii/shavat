'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  // Global error renders without the root layout, so we need inline styles
  return (
    <html lang="en">
      <head>
        <title>Error | Shavat</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --bg-primary: 247 245 241;
            --text-primary: 31 46 36;
            --text-secondary: 74 74 69;
            --text-tertiary: 122 122 116;
            --gold: 200 162 72;
            --border: 217 209 181;
            --brand: 31 46 36;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg-primary: 11 12 13;
              --text-primary: 229 229 225;
              --text-secondary: 184 184 179;
              --text-tertiary: 145 146 141;
              --gold: 200 162 72;
              --border: 38 40 42;
              --brand: 23 25 27;
            }
          }
          body {
            margin: 0;
            font-family: 'Cardo', Georgia, serif;
            background: rgb(var(--bg-primary));
            color: rgb(var(--text-primary));
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container {
            text-align: center;
            max-width: 28rem;
            padding: 1.5rem;
          }
          .logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 2rem;
            opacity: 0.6;
          }
          .code {
            font-family: 'Playfair Display', serif;
            font-size: 7.5rem;
            line-height: 1;
            font-weight: 600;
            color: rgb(var(--gold));
            opacity: 0.3;
            user-select: none;
          }
          h1 {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            font-weight: 600;
            color: rgb(var(--text-primary));
            margin: 1rem 0 0.75rem;
          }
          .verse {
            color: rgb(var(--text-secondary));
            font-size: 1.125rem;
            line-height: 1.625;
            margin-bottom: 0.5rem;
          }
          .ref {
            color: rgb(var(--text-tertiary));
            font-size: 0.875rem;
            margin-bottom: 2rem;
          }
          .divider {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
          }
          .line {
            height: 1px;
            width: 3rem;
            background: rgb(var(--border));
          }
          .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgb(var(--gold));
          }
          .message {
            color: rgb(var(--text-tertiary));
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
          }
          .actions {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
          }
          button {
            padding: 0.75rem 1.5rem;
            background: rgb(var(--brand));
            color: rgb(var(--bg-primary));
            border: none;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
          }
          a {
            padding: 0.75rem 1.5rem;
            border: 1px solid rgb(var(--border));
            color: rgb(var(--text-secondary));
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            text-decoration: none;
          }
          .digest {
            margin-top: 2rem;
            font-size: 0.625rem;
            color: rgb(var(--text-tertiary));
            font-family: monospace;
            opacity: 0.6;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <img src="/logo.webp" alt="Shavat" className="logo" />

          <div className="code">500</div>

          <h1>Something Went Wrong</h1>

          <p className="verse">
            "Be still, and know that I am God."
          </p>
          <p className="ref">Psalm 46:10</p>

          <div className="divider">
            <div className="line" />
            <div className="dot" />
            <div className="line" />
          </div>

          <p className="message">
            A critical error has occurred. Please try again.
          </p>

          <div className="actions">
            <button onClick={reset}>Try Again</button>
            <a href="/">Return Home</a>
          </div>

          {error.digest && (
            <p className="digest">Error ID: {error.digest}</p>
          )}
        </div>
      </body>
    </html>
  );
}
