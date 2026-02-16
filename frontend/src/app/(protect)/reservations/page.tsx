import { fetchReservations } from "@/lib/api/reservation/ssr/reservation";
import { fetchTables } from "@/lib/api/table/ssr/tables";
import IndexPage from "@/components/features/reservations/components/IndexPage";

type Props = {
  searchParams: { date?: string };
};

export default async function ReservationsPage({ searchParams }: Props) {
  const selectedDate =
    searchParams.date ?? new Date().toISOString().slice(0, 10);

  const [reservations, tables] = await Promise.all([
    fetchReservations(selectedDate),
    fetchTables(),
  ]);

  return (
    <IndexPage
      initialReservations={reservations}
      tables={tables}
      selectedDate={selectedDate}
    />
  );
}
