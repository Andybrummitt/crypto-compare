import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { AuthContext } from "../contexts/AuthContext";
import supabase from "../utils/supabaseClient";
import { ErrorMessage } from "./index";

//  Styles

export const AuthContainer = styled.div`
  width: 95%;
  max-width: 600px;
  padding: 0.5rem;
  margin: 2rem auto;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.19);
  border-radius: 0.5rem;
    0px 6px 6px rgba(0, 0, 0, 0.23);
  h1 {
    text-align: center;
  }
  `;

export const Form = styled.form`
  & > div {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    & > input {
      padding: 0.25rem;
      border: 1px solid var(--grey-border-color);
      border-radius: 0.25rem;
    }
  }
  & > button {
    width: 100%;
    padding: 0.25rem;
    border: none;
    background: var(--primary);
    color: white;
    font-size: 1rem;
    border-radius: 0.25rem;
  }
`;

export const LinkToOtherAuth = styled.p`
  margin: 1rem 0;
  text-align: center;
  > a {
    padding: 0 0.25rem;
    text-decoration: underline;
    color: blue;
  }
`;

//  Component

const LogIn = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailInputRef = useRef(null);

  useEffect(() => {
    if (user.isLoggedIn) {
      router.push("/");
    } else {
      emailInputRef.current.focus();
    }
  }, []);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Crypto Compare | Log In</title>
        <meta
          name="description"
          content="Easily compare cryptocurrencies to one another!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <AuthContainer>
          <h1>Log In</h1>
          <Form onSubmit={handleSignIn}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                ref={emailInputRef}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Log In</button>
          </Form>
          <LinkToOtherAuth>
            Don't have an account?<Link href="/signup">Sign Up</Link>
          </LinkToOtherAuth>
          <ErrorMessage>{error}</ErrorMessage>
        </AuthContainer>
      </Layout>
    </>
  );
};

export default LogIn;
