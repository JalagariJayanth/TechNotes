import {Routes,Route} from "react-router-dom"
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/auth/notes/NotesList";
import UserList from "./features/auth/users/UserList";
import EditUser from "./features/auth/users/EditUser";
import NewUserForm from "./features/auth/users/NewUserForm";
import EditNote from "./features/auth/notes/EditNote";
import NewNote from "./features/auth/notes/NewNote";

function App() {
  return (
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
          
          <Route path="users">
            <Route index element={<UserList />} />
            <Route path=":id" element={<EditUser />} />
            <Route path="new" element={<NewUserForm />} />
          </Route>

          <Route path="notes">
            <Route index element={<NotesList />} />
            <Route path=":id" element={<EditNote />} />
            <Route path="new" element={<NewNote />} />
          </Route>

        </Route>

      </Route>
     </Routes>
  );
}

export default App;
