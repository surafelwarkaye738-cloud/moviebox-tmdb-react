import React, {
  createContext,
  useContext,
  useState,
} from "react";

/*
  Key used to save the demo
  user inside localStorage.
*/
const AUTH_STORAGE_KEY =
  "netflix_clone_user";

/*
  Create authentication context.
*/
const AuthContext =
  createContext(null);

/*
  Read the saved user from
  localStorage.
*/
const getStoredUser = () => {
  try {
    const storedUser =
      localStorage.getItem(
        AUTH_STORAGE_KEY
      );

    /*
      No saved user.
    */
    if (!storedUser) {
      return null;
    }

    /*
      Convert JSON string
      back into JavaScript object.
    */
    const parsedUser =
      JSON.parse(storedUser);

    /*
      Validate the stored value.
    */
    if (
      !parsedUser ||
      typeof parsedUser !==
        "object"
    ) {
      return null;
    }

    return parsedUser;
  } catch (error) {
    console.error(
      "Failed to read saved user:",
      error
    );

    return null;
  }
};

/*
  Authentication Provider.
*/
export function AuthProvider({
  children,
}) {
  /*
    Load saved user when the
    application starts.
  */
  const [user, setUser] =
    useState(
      getStoredUser
    );

  /*
    Frontend demo login.
  */
  const login = ({
    name,
    email,
  }) => {
    const cleanName =
      name.trim();

    const cleanEmail =
      email.trim().toLowerCase();

    /*
      Validate values.
    */
    if (
      !cleanName ||
      !cleanEmail
    ) {
      return false;
    }

    /*
      Create demo user.
    */
    const newUser = {
      id: `demo-${Date.now()}`,

      name: cleanName,

      email: cleanEmail,
    };

    /*
      Save user to browser.
    */
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(
        newUser
      )
    );

    /*
      Update React state.
    */
    setUser(newUser);

    return true;
  };

  /*
    Update profile information.
  */
  const updateProfile = ({
    name,
  }) => {
    /*
      User must exist.
    */
    if (!user) {
      return false;
    }

    const cleanName =
      name.trim();

    if (!cleanName) {
      return false;
    }

    /*
      Create updated user.
    */
    const updatedUser = {
      ...user,
      name: cleanName,
    };

    /*
      Save updated user.
    */
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(
        updatedUser
      )
    );

    /*
      Update React.
    */
    setUser(updatedUser);

    return true;
  };

  /*
    Sign out.
  */
  const signOut = () => {
    localStorage.removeItem(
      AUTH_STORAGE_KEY
    );

    setUser(null);
  };

  /*
    Values available to all
    components.
  */
  const value = {
    user,

    isAuthenticated:
      Boolean(user),

    login,

    updateProfile,

    signOut,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

/*
  Custom hook.
*/
export const useAuth = () => {
  const context =
    useContext(
      AuthContext
    );

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
};