import { NewPage } from "@/components/features/reservations/forms/NewPage";

type Props = {
  searchParams: { date?: string };
};

export default function Page({ searchParams }: Props) {
  const date = searchParams.date ?? new Date().toISOString().slice(0, 10);

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="text-2xl font-bold mb-6">新規予約</h1>
      <NewPage date={date} />
    </div>
  );
}
