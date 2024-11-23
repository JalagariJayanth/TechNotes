import { useParams } from "react-router-dom"
import { useSelector,useDispatch } from "react-redux"
import { selectUserById } from "./userSelector"
import EditUserForm from "./EditUserForm";



const EditUser = () => {
    const {id} = useParams();
    const user = useSelector(state => selectUserById(state,id))
    console.log(user)
    const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>

    return content
}

export default EditUser