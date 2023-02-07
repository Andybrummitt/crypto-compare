import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { AuthContext } from "../contexts/AuthContext";
import supabase from "../utils/supabaseClient";
import { ErrorMessage } from "./index";
import { AuthContainer, Form, LinkToOtherAuth } from "./login";

const SignUp = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signUp({
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
        <title>Crypto Compare | Sign Up</title>
        <meta
          name="description"
          content="Easily compare cryptocurrencies to one another!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <AuthContainer>
          <h1>Sign Up</h1>
          <Form onSubmit={handleSubmit}>
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
            <button type="submit">Sign up</button>
          </Form>
          <LinkToOtherAuth>
            Already have an account?<Link href="/login">Log in</Link>
          </LinkToOtherAuth>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </AuthContainer>
      </Layout>
    </>
  );
};

export default SignUp;
