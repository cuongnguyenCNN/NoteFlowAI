export interface Folder {
  id: string; // hoặc number, tùy database
  user_id: string;
  name: string;
  description: string;
  created_at: string; // ISO date string
}
