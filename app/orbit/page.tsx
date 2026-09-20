import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { OrbitTrajectory } from "@/components/orbit";
import { ROUTE_META } from "@/lib/data";

export const metadata: Metadata = ROUTE_META["/orbit"];

export default function OrbitPage() {
  return (
    <>
      <PageIntro
        route={ROUTE_META["/orbit"].path ?? "~/orbit"}
        index="04"
        title="Orbit."
        description={
          <>
            Where the operator came from, what is in build, and the next
            position in the trajectory.
          </>
        }
        meta={[
          ["Class", "Public"],
          ["Nodes", "3 in sequence"],
        ]}
      />
      <OrbitTrajectory />
    </>
  );
}