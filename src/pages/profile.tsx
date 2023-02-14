import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import styled from "styled-components";
import WithAuth from "../components/hoc/WithAuth";
import Layout from "../components/Layout";
import { AuthContext } from "../contexts/AuthContext";
import supabase from "../utils/supabaseClient";
import { ErrorMessage } from "./index";

const Container = styled.div`
  width: 95%;
  margin: 1rem auto;
  max-width: 400px;
  padding: 1rem;
  box-shadow: var(--card-box-shadow);
  display: flex;
  flex-direction: column;
  > * {
    margin: 0.5rem 0;
  }
  button {
    width: 100%;
  }
  > div {
    button {
      margin-bottom: 0.5rem;
    }
  }
`;

const H1 = styled.h1`
  font-size: 1.5rem;
  margin: 1rem 0;
  text-align: center;
  @media (min-width: 700px) {
    font-size: 2rem;
  }
`;

const WarningText = styled.p`
  color: var(--orange);
`;

const Button = styled.button`
  padding: 0.5rem;
  border: none;
  background: var(--primary);
  color: white;
  font-size: 1rem;
  border-radius: 0.25rem;
`;

const DeleteContainer = styled.div`
  margin-top: 5rem;
`;

const DeleteButton = styled(Button)`
  background: var(--red);
`;

const PortfolioButton = styled(Button)`
  background: var(--green);
`;

//  Component

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.post("/api/delete-user", {
        userId: user.userId,
      });
      setUser({
        isLoggedIn: null,
        email: "",
        userId: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Crypto Compare | Profile</title>
        <meta
          name="description"
          content="Easily compare cryptocurrencies to one another!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Container>
          <div>
            <H1>Profile</H1>
            <p>Logged in as {user.email}</p>
          </div>
          <ErrorMessage>{error}</ErrorMessage>
          <Button onClick={handleSignOut}>Sign Out</Button>
          <Link href="/portfolio">
            <PortfolioButton>View your assets</PortfolioButton>
          </Link>
          <DeleteContainer>
            <DeleteButton onClick={handleDeleteUser}>
              Delete Account
            </DeleteButton>
            <WarningText>
              Warning this method cannot be undone. Your account and portfolio
              will be permanently deleted.
            </WarningText>
          </DeleteContainer>
        </Container>
      </Layout>
    </>
  );
};

export default WithAuth(Profile);
