import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const WithAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { user } = useContext(AuthContext);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!user.isLoggedIn) {
        router.push("/login");
      }
    }, [user.isLoggedIn]);
    return <>{user.isLoggedIn ? <WrappedComponent /> : null}</>;
  };
};

export default WithAuth;
