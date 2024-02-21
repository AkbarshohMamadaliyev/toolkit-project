import { useState } from "react"
import { icon } from "../constants"
import { Input } from '../ui'
import { useDispatch, useSelector } from "react-redux"
import { registerUserStart, registerUserSuccess, registerUserFailure } from "../slice/auth"
import AuthService from "../service/auth"

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.auth)

  const loginHandle = async (e) => {
    e.preventDefault();
    dispatch(registerUserStart())
    const user = { username: name, email, password }

    try {
      const response = await AuthService.userRegister(user)
      console.log('response', response);
      console.log('user', user);
      dispatch(registerUserSuccess())
    } catch (error) {
      dispatch(registerUserFailure())
    } 
  }

  return (
    <div className='text-center mt-5'>
      <main className="form-signin w-25 m-auto">
        <form>
          <img className="mb-2" src={icon} alt="" width="72" height="60" />
          <h1 className="h3 mb-3 fw-normal">Please register</h1>

          <Input label={"Username"} state={name} setState={setName} />
          <Input label={"Email address"} type={"email"} state={email} setState={setEmail} />
          <Input label={"Password"} type={"password"} state={password} setState={setPassword} />

          <button className="btn btn-primary w-100 py-2 mt-2" type="submit" disabled={isLoading} onClick={loginHandle}>
            {isLoading ? "loading..." : "Register"}
          </button>
        </form>
      </main>
    </div>
  )
}

export default Register