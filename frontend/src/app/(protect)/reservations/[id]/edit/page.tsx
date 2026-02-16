import ReservationEditPageContent from "@/components/features/reservations/forms/EditPage";

export default function ReservationEditPage({
  params,
}: {
  params: { id: string };
}) {
  return <ReservationEditPageContent id={params.id} />;
}
