import { createContext, useContext, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { Note } from "../types";
type NotesContextType = {
  notes: Note[];
  loading: boolean;
  fetchNotes: (userId: string) => Promise<void>;
  createNote: (note: Partial<Note>) => Promise<void>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: string, userId: string) => Promise<void>;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId);
    if (!error) setNotes(data || []);
    setLoading(false);
  };

  const createNote = async (note: Partial<Note>) => {
    const { error } = await supabase.from("notes").insert(note);
    if (!error && note.user_id) await fetchNotes(note.user_id);
  };

  const updateNote = async (id: string, updates: Partial<Note>) => {
    await supabase.from("notes").update(updates).eq("id", id);
    if (updates.user_id) await fetchNotes(updates.user_id);
  };

  const deleteNote = async (id: string, userId: string) => {
    await supabase.from("notes").delete().eq("id", id);
    await fetchNotes(userId);
  };

  return (
    <NotesContext.Provider
      value={{ notes, loading, fetchNotes, createNote, updateNote, deleteNote }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within NotesProvider");
  return context;
};
