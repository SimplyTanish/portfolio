import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ScrollProvider } from "@/components/scroll-provider";
import { LauncherProvider } from "@/components/launcher";
import { Cursor } from "@/components/cursor";
import { Noise } from "@/components/noise";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TerminalProvider } from "@/components/terminal";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://toro.dev"),
  title: {
    default: "Toro — Cybersecurity Portfolio",
    template: "%s — Toro",
  },
  description:
    "Cybersecurity student from Mumbai building secure infrastructure, researching offensive security, and designing production-grade digital systems.",
  keywords: [
    "Toro",
    "Cybersecurity",
    "Systems Engineer",
    "Security Researcher",
    "Red Team",
    "Active Directory",
    "Mumbai",
    "Linux",
    "Next.js",
  ],
  authors: [{ name: "Toro" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://toro.dev",
    siteName: "TORO",
    title: "Toro — Cybersecurity Portfolio",
    description:
      "Cybersecurity student from Mumbai building secure infrastructure, researching offensive security, and designing production-grade digital systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toro — Cybersecurity Portfolio",
    description:
      "Cybersecurity student from Mumbai building secure infrastructure, researching offensive security, and designing production-grade digital systems.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body className="bg-background min-h-screen text-ink">
        <Noise />
        <ScrollProvider>
          <Cursor />
          <LauncherProvider>
            <TerminalProvider>
              <Nav />
              <PageShell>{children}</PageShell>
              <Footer />
            </TerminalProvider>
          </LauncherProvider>
        </ScrollProvider>
      </body>
    </html>
  );
}