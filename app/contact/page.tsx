import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ContactChannels } from "@/components/contact";
import { ROUTE_META } from "@/lib/data";

export const metadata: Metadata = ROUTE_META["/contact"];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        route={ROUTE_META["/contact"].path ?? "~/contact"}
        index="06"
        title="Open a"
        titleSoft="channel."
        description={
          <>
            Open for internships, research collaborations, and conversations
            about security or infrastructure. Message me — normally right back.
          </>
        }
        meta={[
          ["Class", "Public"],
          ["Response", "Normally same-day"],
        ]}
      />
      <ContactChannels />
    </>
  );
}