export interface Note {
  id: string;
  folder_id: string | null;
  title: string | null;
  content: string | null;
  created_at: string; // ISO timestamp format
  summary: string | null;
  mindmap_data: Record<string, any> | null;
  flashcards: Record<string, any> | null;
  transcript: string | null;
  translated_content: string | null;
  language: string;
  updated_at: string; // ISO timestamp format
  deleted: boolean;
  is_premium: boolean;
  word_count: number | null;
  user_id: string;
}
