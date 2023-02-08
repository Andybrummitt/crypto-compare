import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const WithAuth = (WrappedComponent) => {
  return () => {
    const router = useRouter();
    const { user } = useContext(AuthContext);

    useEffect(() => {
      if (!user.isLoggedIn) {
        router.push("/login");
      }
    }, [user.isLoggedIn]);
    return <>{user.isLoggedIn ? <WrappedComponent /> : null}</>;
  };
};

export default WithAuth;
