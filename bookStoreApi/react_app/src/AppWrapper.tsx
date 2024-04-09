import React, { ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";

type AppWrapperProps = {
  children: ReactElement;
};

/**
 * This component wraps our App with the providers we do not want to have in our tests
 */
const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return <Router>{children}</Router>;
};

export default AppWrapper;
