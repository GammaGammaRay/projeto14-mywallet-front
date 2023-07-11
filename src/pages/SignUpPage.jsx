import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { signUp } from "../services/api.js/api";

import MyWalletLogo from "../components/MyWalletLogo";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [attemptingSignUp, setAttemptingSignUp] = useState(false);

  const navigate = useNavigate();

  function handleRegisterUser(e) {
    e.preventDefault();
    if (!username || !email || !newPassword || !newPasswordConfirm) {
      return alert("Todos os campos são obrigatórios!");
    } else if (newPassword !== newPasswordConfirm) {
      return alert("Senhas não !");
    } else {
      registerUser();
    }
  }

  function registerUser(e) {
    setAttemptingSignUp(true);

    const data = {
      name: username,
      email,
      password: newPassword,
    };

    function signUpSuccess() {
      navigate("/");
    }

    function signUpFailure() {
      setAttemptingSignUp(false);
    }

    signUp(data, signUpSuccess, signUpFailure);
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleRegisterUser}>
        <MyWalletLogo />
        <input
          data-test="name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nome"
          type="text"
          autoComplete="username"
          required
        />
        <input
          data-test="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          type="email"
          autoComplete="email"
          required
        />
        <input
          data-test="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          required
        />
        <input
          data-test="conf-password"
          value={newPasswordConfirm}
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          required
        />
        <button data-test="sign-up-submit" type="submit" disabled={attemptingSignUp}>
          Cadastrar
        </button>
      </form>

      <Link to={"/"}>Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
