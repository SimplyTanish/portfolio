import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { OperationsGrid } from "@/components/operations";
import { ROUTE_META } from "@/lib/data";

export const metadata: Metadata = ROUTE_META["/operations"];

export default function OperationsPage() {
  return (
    <>
      <PageIntro
        route={ROUTE_META["/operations"].path ?? "~/operations"}
        index="02"
        title="Featured"
        titleSoft="Operations."
        description={
          <>
            Selected files from the field — production systems in development,
            offensive-security research, and open tooling. Each opens as its own
            case file.
          </>
        }
        meta={[
          ["Class", "Public"],
          ["Status", "3 files on record"],
        ]}
      />
      <OperationsGrid />
    </>
  );
}