import { useSelector } from "react-redux"
import { selectAllUsers } from "../users/userSelector"
import NewNoteForm from "./NewNoteForm";


const NewNote = () => {
    const users = useSelector(selectAllUsers);
    
    if(!users?.length) return <p>Note Currently Available</p>

    const content = <NewNoteForm users={users} /> 

    return content;
}

export default NewNote