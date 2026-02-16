export type Notification = {
  id: number;
  title: string;
  body: string;
  published: boolean;
  published_at: string | null;
  created_by_id: number;
  created_at: string;
  updated_at: string;
};
