import { useState,useEffect } from "react"
import { selectAddNoteStatus,selectNotesError,selectNotesLoading } from "./notesSelector"
import { useNavigate } from "react-router-dom"
import { addNote } from "../../../app/slices/notesSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { useSelector,useDispatch } from "react-redux"
import { fetchUsers } from "../../../app/slices/usersSlice"

const NewNoteForm = ({users}) => {
    // console.log(users);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   
   const loading = useSelector(selectNotesLoading);
   const error = useSelector(selectNotesError);
   const addStatus = useSelector(selectAddNoteStatus);

   const [title, setTitle] = useState('')
   const [text, setText] = useState('')
   const [userId, setUserId] = useState(users[0]?._id)

   useEffect(() => {
    dispatch(fetchUsers());
}, []);

   const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && addStatus !== "pending";

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await dispatch(addNote({ user: userId, title, text }))
            navigate("/dash/notes")
        }
    }

    const errClass = error ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''


    const options = users.map(user => {
        return (
            <option
                key={user._id}
                value={user._id}
            > {user.username}</option >
        )
    })



  return (
    <>
    <p className={errClass}>{error?.data?.message}</p>

    <form className="form" onSubmit={onSaveNoteClicked}>
        <div className="form__title-row">
            <h2>New Note</h2>
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
        <label className="form__label" htmlFor="title">
            Title:</label>
        <input
            className={`form__input ${validTitleClass}`}
            id="title"
            name="title"
            type="text"
            autoComplete="off"
            value={title}
            onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="text">
            Text:</label>
        <textarea
            className={`form__input form__input--text ${validTextClass}`}
            id="text"
            name="text"
            value={text}
            onChange={onTextChanged}
        />

        <label className="form__label form__checkbox-container" htmlFor="username">
            ASSIGNED TO:</label>
        <select
            id="username"
            name="username"
            className="form__select"
            value={userId}
            onChange={onUserIdChanged}
        >
            {options}
        </select>

    </form>
</>
  )
}

export default NewNoteForm