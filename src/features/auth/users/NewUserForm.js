import { useState,useEffect } from "react"
import { selectAddUserStatus,selectUsersError, selectUsersLoading } from "./userSelector";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../../config/roles";
import { addUser } from "../../../app/slices/usersSlice";
import { useSelector,useDispatch } from "react-redux";

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const addStatus = useSelector(selectAddUserStatus)
  

  

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])

  useEffect(() =>{
       setValidUsername(USER_REGEX.test(username))
  },[username])

  useEffect(() => {
setValidPassword(PWD_REGEX.test(password))
  },[password])

//   useEffect(() => {
//     if(addStatus === "idle"){
//       setUsername("");
//       setPassword("");
//       setRoles(["Employee"]);
//       navigate("/dash/users")
//     }

//   },[addStatus,navigate])

  const onUsernameChanged = e => setUsername(e.target.value)
  const onPasswordChanged = e => setPassword(e.target.value)

  const onRolesChanged = (e) => {
    const values = Array.from(
        e.target.selectedOptions,
        (option) => option.value
    );
    setRoles(values);
};

const canSave =
[roles.length, validUsername, validPassword].every(Boolean) &&
addStatus !== "pending";

 const onSaveUserClicked =async (e) => {
  e.preventDefault();
  if(canSave) {
     await dispatch(addUser({username,password,roles}))
     navigate("/dash/users");
  }
 }



  // UI Classes
  const errClass = error ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
      ? "form__input--incomplete"
      : "";

 const options = Object.values(ROLES).map((role) => (
  <option key={role} value={role}>
      {role}
  </option>
));


return (
  <>
      <p className={errClass}>{error}</p>
      <form className="form" onSubmit={onSaveUserClicked}>
          <div className="form__title-row">
              <h2>New User</h2>
              <div className="form__action-buttons">
                  <button
                      className="icon-button"
                      title="Save"
                      disabled={!canSave}
                  >
                      <FontAwesomeIcon icon={faSave} />
                  </button>
              </div>
          </div>
          <label className="form__label" htmlFor="username">
              Username: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
              className={`form__input ${validUserClass}`}
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={onUsernameChanged}
          />
          <label className="form__label" htmlFor="password">
              Password:{" "}
              <span className="nowrap">[4-12 chars incl. !@#$%]</span>
          </label>
          <input
              className={`form__input ${validPwdClass}`}
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChanged}
          />
          <label className="form__label" htmlFor="roles">
              ASSIGNED ROLES:
          </label>
          <select
              id="roles"
              name="roles"
              className={`form__select ${validRolesClass}`}
              multiple={true}
              size="3"
              value={roles}
              onChange={onRolesChanged}
          >
              {options}
          </select>
      </form>
  </>

  )
}

export default NewUserForm