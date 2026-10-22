import type { ReactNode } from "react";

export const metadata = {
  title: "LiteLLM OIDC Test",
  description: "Temporary Vercel OIDC → LiteLLM connectivity test",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ fontFamily: "sans-serif", margin: "2rem" }}>{children}</body>
    </html>
  );
}
