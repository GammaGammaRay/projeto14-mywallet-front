import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import {HomePage, SignInPage, SignUpPage, TransactionsPage} from "./pages"
import UserProvider from "./contexts/UserContext";

export default function App() {
  return (
    <UserProvider>
      <PagesContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/nova-transacao/:tipo"
              element={<TransactionsPage />}
            />
          </Routes>
        </BrowserRouter>
      </PagesContainer>
    </UserProvider>
  );
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`;
