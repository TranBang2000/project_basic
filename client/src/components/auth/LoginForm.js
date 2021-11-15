import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from './../layout/AlertMessage';

const LoginForm = () => {
  const { loginUser } = useContext(AuthContext);
  //router
  //local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState(null)
  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }else{}
		console.log(loginData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form className="my-4" onSubmit={login}>
      <AlertMessage info={alert}/>
        <Form.Group className="form-login">
          <Form.Control
            value={username}
            onChange={onChangeLoginForm}
            name="username"
            type="text"
            placeholder="Username"
          />
        </Form.Group>
        <Form.Group className="form-login">
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button className="form-login" variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
