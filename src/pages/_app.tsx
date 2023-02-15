import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { AuthContext, User } from "../contexts/AuthContext";
import "../styles/globals.css";
import supabase from "../utils/supabaseClient";

//  Styles

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

const LoadingOverlay = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.1);
  z-index: 5;
`;

const Spinner = styled.img`
  height: 100px;
  width: 100px;
  animation: ${spin} 0.5s infinite linear;
  z-index: 6;
`;

export default function App({ Component, pageProps }: AppProps) {
  //  Page Loading Functionality
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const [user, setUser] = useState<User>({
    isLoggedIn: false,
    userId: null,
    email: null,
  });
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser({
          isLoggedIn: true,
          userId: session.user.id,
          email: session.user.email,
        });
      }
      if (event === "SIGNED_OUT") {
        setUser({ isLoggedIn: false, userId: null, email: null });
      }
    });
    checkUser();
    return () => subscription.unsubscribe();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUser({ isLoggedIn: true, userId: user.id, email: user.email });
    }
  }
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? (
        <LoadingOverlay>
          <Spinner src="bitcoin.png" />
        </LoadingOverlay>
      ) : null}
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
