import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { AuthContext, User } from "../contexts/AuthContext";
import "../styles/globals.css";
import supabase from "../utils/supabaseClient";

export default function App({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}
