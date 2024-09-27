// import { fakeData as notes } from "../assets/fakeData";
import NoteCard from "../components/NoteCard";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import Controls from "../components/Controls";

const NotesPage = () => {
  const { notes } = useContext(NotesContext);

  return (
    <div>
      {notes?.map((note) => {
        return <NoteCard key={note.$id} note={note} />;
      })}
      <Controls />
    </div>
  );
};

export default NotesPage;
