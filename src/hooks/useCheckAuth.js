import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import { FirebaseAuth } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";

export const useCheckAuth = () => {
  const { status, setUser, startLoadingNotes } = useContext(AuthContext);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user)
        return setUser({
          uid: null,
          name: null,
          email: null,
          photoURL: null,
          status: false,
        });
      const { uid, email, displayName, photoURL } = user;
      setUser({ uid, email, displayName, photoURL, status: true });
      startLoadingNotes();
    });
  }, [status]);

  return { status };
};
