import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ArsenalGrid } from "@/components/arsenal";
import { ROUTE_META } from "@/lib/data";

export const metadata: Metadata = ROUTE_META["/arsenal"];

export default function ArsenalPage() {
  return (
    <>
      <PageIntro
        route={ROUTE_META["/arsenal"].path ?? "~/arsenal"}
        index="03"
        title="Arsenal."
        description={
          <>
            The toolset, grouped by discipline. Familiarity is tracked by what
            ships — no proficiency bars, no numbers.
          </>
        }
        meta={[
          ["Class", "Public"],
          ["Items", "16 on record"],
        ]}
      />
      <ArsenalGrid />
    </>
  );
}