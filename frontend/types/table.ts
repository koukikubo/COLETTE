export type Table = {
  enabled: boolean;
  id: number;
  code: string;
  name: string;
  seat_type: "counter" | "table";
  capacity: number;
};

export type Props = {
  initialData: Table[];
};
