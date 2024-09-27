// import { fakeData as notes } from "../assets/fakeData";
import { db } from "../appwrite/databases";
import NoteCard from "../components/NoteCard";
import { useEffect, useState } from "react";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const response = await db.notes.list();

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
