import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectNoteById } from "./notesSelector";
import { selectAllUsers } from "../users/userSelector";
import EditNoteForm from "./EditNoteForm";

const EditNote = () => {
  const {id} = useParams();
  const note = useSelector(state => selectNoteById(state,id));
  const users = useSelector(selectAllUsers);

  const content = note && users ? <EditNoteForm note={note} users={users} /> : <p>Loading...</p>
  return content;
}

export default EditNote