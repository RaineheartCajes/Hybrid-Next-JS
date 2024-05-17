"use client";

import React from "react";
import { Provider } from "react-redux";
import { dispatch, store } from ".";
//import { setUser } from "./slice/session";

type Props = {
  //user: User | null;
  children: React.ReactNode;
};

const ReduxProvider: React.FC<Props> = ({ children }) => {
 //dispatch(setUser(user));

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;