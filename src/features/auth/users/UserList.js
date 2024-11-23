import { useSelector,useDispatch } from "react-redux";
import { fetchUsers } from "../../../app/slices/usersSlice";
import { selectAllUsers,selectUsersError,selectUsersLoading } from "./userSelector";
import User from "./User";
import { useEffect } from "react";

const UserList = () => {
   const dispatch = useDispatch();
   const users = useSelector(selectAllUsers);
   const loading = useSelector(selectUsersLoading);
   const error = useSelector(selectUsersError);
   
  // console.log(users)

   useEffect(() => {
    console.log("Dispatching fetchUsers");
    dispatch(fetchUsers());
}, [dispatch]);

  let content;

  if(loading) content = <p>Loading...</p>

  if(error){
    content = <p className="errmsg">{error.message}</p>
  }
  
  
  const tableContent = users?.length
  ? users.map(eachUser => <User key={eachUser._id} userId={eachUser._id} />)
  : null

  content = (
    <table className="table table--users">
        <thead className="table__thead">
            <tr>
                <th scope="col" className="table__th user__username">Username</th>
                <th scope="col" className="table__th user__roles">Roles</th>
                <th scope="col" className="table__th user__edit">Edit</th>
            </tr>
        </thead>
        <tbody>
            {tableContent}
        </tbody>
    </table>
)


  return content;
}

export default UserList