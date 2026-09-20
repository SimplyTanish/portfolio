import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ArchiveCollections } from "@/components/archive";
import { ROUTE_META } from "@/lib/data";

export const metadata: Metadata = ROUTE_META["/archive"];

export default function ArchivePage() {
  return (
    <>
      <PageIntro
        route={ROUTE_META["/archive"].path ?? "~/archive"}
        index="05"
        title="Archive."
        description={
          <>
            The personal side of the system — monochrome photography, books
            that shaped the operator, and journal entries on security.
          </>
        }
        meta={[
          ["Class", "Personal"],
          ["Collections", "Photography · Library · Journal"],
        ]}
      />
      <ArchiveCollections />
    </>
  );
}