import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket,faFileCirclePlus,faFilePen,faUserGear,faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate,Link,useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAccessToken } from '../app/slices/authSlice'
import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const {isManager,isAdmin} = useAuth();
    
    const error = useSelector(state => state.auth.error)


    if (error) return <p>Error: {error.data?.message}</p>
   
    let dashClass = null 
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/notes')
    const onUsersClicked = () => navigate('/dash/users')

    const onClickLogout = () => {
        localStorage.removeItem("accessToken")
        dispatch(clearAccessToken())
        navigate("/login")
    }

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className="icon-button"
                title="New Note"
                onClick={onNewNoteClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <button
                className="icon-button"
                title="Notes"
                onClick={onNotesClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }


    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={onClickLogout}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )


    const content = (
        
        <header className="dash-header">
            <div className="dash-header__container">
                <Link to="/dash">
                    <h1 className="dash-header__title">AssignMate</h1>
                </Link>
                <nav className="dash-header__nav">
                {logoutButton}
                </nav>
            </div>
        </header>
        
    )

    return content
}

export default DashHeader