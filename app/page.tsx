import type { Metadata } from "next";
import { Desktop } from "@/components/desktop";
import { ROUTE_META } from "@/lib/data";

export const metadata: Metadata = ROUTE_META["/"];

export default function Home() {
  return <Desktop />;
}