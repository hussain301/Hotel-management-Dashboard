import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from '../../ui/SpinnerMini'
import FormRowVertical from "../../ui/FormRowVertical";

import useLogin from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("hussain@temp.com");
  const [password, setPassword] = useState("hussain");
  const {loginUser, isLogging} = useLogin();
  
  function handleSubmit(e) {
    e.preventDefault();
    if (email && password)
      loginUser({ email, password }, {
        onSettled: () => {
          setEmail('');
          setPassword('');
        }
      });
    return 
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isLogging}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLogging}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLogging}>{isLogging?<SpinnerMini/>:'login'}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
