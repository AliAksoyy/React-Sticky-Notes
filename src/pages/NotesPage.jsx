// import { fakeData as notes } from "../assets/fakeData";
import { databases } from "../appwrite/config";
import NoteCard from "../components/NoteCard";
import { useEffect, useState } from "react";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_NOTES_ID
      );

      setNotes(response.documents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {notes?.map((note) => {
        return <NoteCard key={note.$id} note={note} />;
      })}
    </div>
  );
};

export default NotesPage;
