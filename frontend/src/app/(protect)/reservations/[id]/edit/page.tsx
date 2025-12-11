import ReservationEditPageContent from "@/components/View/reservations/ReservationEditPageContent";

export default function ReservationEditPage({
  params,
}: {
  params: { id: string };
}) {
  return <ReservationEditPageContent id={params.id} />;
}
