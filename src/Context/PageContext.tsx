import React from "react";
import { Page } from "../App";

const PageContext = React.createContext((newPage: Page) => {});

export default PageContext;