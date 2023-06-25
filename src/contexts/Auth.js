import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);