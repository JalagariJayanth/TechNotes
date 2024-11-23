import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../../config/roles";
import { updateUser,deleteUser } from "../../../app/slices/usersSlice";
import { selectUsersLoading, selectUsersError } from "./userSelector"

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector(selectUsersLoading);
    const error = useSelector(selectUsersError);

    const [username, setUsername] = useState(user.username);
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(user.roles);
    const [active, setActive] = useState(user.active);

    // Validation
    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    const onUsernameChanged = (e) => setUsername(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);

    const onRolesChanged = (e) => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        );
        setRoles(values);
    };

    const onActiveChanged = () => setActive((prev) => !prev);

    const onSaveUserClicked = async (e) => {
        e.preventDefault();
    
        // Ensure password is updated only if changed
        const updatedUser = { id: user._id, username, roles, active };
        if (password) updatedUser.password = password; // Only include password if it's provided
    
        try {
            await dispatch(updateUser(updatedUser)).unwrap(); // unwrap() is for RTK Query, it throws errors if any
            navigate("/dash/users"); // Redirect to the user list or dashboard after update
        } catch (err) {
            console.error("Failed to update user:", err);
        }
    };
    

    const onDeleteUserClicked = () => {
        dispatch(deleteUser(user._id))
    };

    const options = Object.values(ROLES).map((role) => (
        <option key={role} value={role}>
            {role}
        </option>
    ));

    

    const canSave =
        (password
            ? [roles.length, validUsername, validPassword]
            : [roles.length, validUsername]
        ).every(Boolean);

    console.log(canSave)

    

    const errClass = error ? "errmsg" : "offscreen";
    const validUserClass = !validUsername ? "form__input--incomplete" : "";
    const validPwdClass = password && !validPassword ? "form__input--incomplete" : "";
    const validRolesClass = !Boolean(roles.length) ? "form__input--incomplete" : "";

    const errContent = error ?? "";

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
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
                    <span className="nowrap">[empty = no change]</span>{" "}
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

                <label className="form__label form__checkbox-container" htmlFor="user-active">
                    ACTIVE:
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>

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
    );

    return content;
};

export default EditUserForm;
