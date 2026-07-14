import { FounderProfile } from "@/features/founder-profile/components/FounderProfile";

export default async function FounderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return (
    <div className="min-h-screen">
      <FounderProfile id={resolvedParams.id} />
    </div>
  );
}
