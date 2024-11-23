import { useSelector,useDispatch } from "react-redux";
import { fetchNotes } from "../../../app/slices/notesSlice";
import { selectAllNotes,selectNotesError,selectNotesLoading } from "./notesSelector";
import { useEffect } from "react";
import Note from "./Note";
import useAuth from "../../../hooks/useAuth";

const NotesList = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectAllNotes);
  const loading = useSelector(selectNotesLoading);
  const error = useSelector(selectNotesError);

  const {username,isManager,isAdmin} = useAuth();

  useEffect(() => {
    dispatch(fetchNotes());
}, [dispatch]);

let content

if (loading) content = <p>Loading...</p>

if (error) {
  content = <p className="errmsg">{error.message}</p>
}
const tableContent = notes?.length
? notes.map(eachNote => <Note key={eachNote._id} noteId={eachNote._id} />)
: null

content = (
<table className="table table--notes">
    <thead className="table__thead">
        <tr>
            <th scope="col" className="table__th note__status">Username</th>
            <th scope="col" className="table__th note__created">Created</th>
            <th scope="col" className="table__th note__updated">Updated</th>
            <th scope="col" className="table__th note__title">Title</th>
            <th scope="col" className="table__th note__username">Owner</th>
            <th scope="col" className="table__th note__edit">Edit</th>
        </tr>
    </thead>
    <tbody>
        {tableContent}
    </tbody>
</table>
)


return content;
}

export default NotesList