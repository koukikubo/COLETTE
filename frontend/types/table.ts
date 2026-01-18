export type Table = {
  id: number;
  code: string;
  name: string;
  seat_type: "counter" | "table";
  capacity: number;
};

export type Props = {
  initialData: Table[];
};
