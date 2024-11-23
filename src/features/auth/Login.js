import { useRef,useState,useEffect } from "react"
import { useNavigate,Link } from "react-router-dom"

import { useDispatch } from "react-redux"
import { login } from "../../app/slices/authSlice"
import { setAccessToken } from "../../app/slices/authSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username,setUserName] = useState("");
  const [password,setPassword] = useState("");
  const [errMsg,setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserInput = (e) => setUserName(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)

  useEffect(() => {
    userRef.current.focus()
}, [])

useEffect(() => {
    setErrMsg('');
}, [username, password])


const handleSubmit = async (e) => {
  e.preventDefault()
  try {
      const { accessToken } = await dispatch(login({ username, password })).unwrap()
      dispatch(setAccessToken({ accessToken }))
      setUserName('')
      setPassword('')
      navigate('/dash')
  } catch (err) {
      if (!err.status) {
          setErrMsg('No Server Response');
      } else if (err.status === 400) {
          setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg(err.data?.message);
      }
      errRef.current.focus();
  }
}

  const errClass = errMsg ? "errmsg" : "offscreen";


  return (
    <section className="public">
    <header>
        <h1>Employee Login</h1>
    </header>
    <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                className="form__input"
                type="text"
                id="username"
                ref={userRef}
                value={username}
                onChange={handleUserInput}
                autoComplete="off"
                required
            />

            <label htmlFor="password">Password:</label>
            <input
                className="form__input"
                type="password"
                id="password"
                onChange={handlePwdInput}
                value={password}
                required
            />
            <button className="form__submit-button">Sign In</button>
        </form>
    </main>
    <footer>
        <Link to="/">Back to Home</Link>
    </footer>
</section>
  )
}

export default Login