import { createContext, useContext, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { Folder } from "@/src/types";

type FoldersContextType = {
  folders: Folder[];
  fetchFolders: (userId: string) => Promise<void>;
  createFolder: (folder: Partial<Folder>) => Promise<void>;
  deleteFolder: (id: string, userId: string) => Promise<void>;
};

const FoldersContext = createContext<FoldersContextType | undefined>(undefined);

export const FoldersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [folders, setFolders] = useState<Folder[]>([]);

  const fetchFolders = async (userId: string) => {
    const { data } = await supabase
      .from("folders")
      .select("*")
      .eq("user_id", userId);
    if (data) setFolders(data);
  };

  const createFolder = async (folder: Partial<Folder>) => {
    await supabase.from("folders").insert(folder);
    if (folder.user_id) await fetchFolders(folder.user_id);
  };

  const deleteFolder = async (id: string, userId: string) => {
    await supabase.from("folders").delete().eq("id", id);
    await fetchFolders(userId);
  };

  return (
    <FoldersContext.Provider
      value={{ folders, fetchFolders, createFolder, deleteFolder }}
    >
      {children}
    </FoldersContext.Provider>
  );
};

export const useFolders = () => {
  const context = useContext(FoldersContext);
  if (!context)
    throw new Error("useFolders must be used within FoldersProvider");
  return context;
};
