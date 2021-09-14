import * as React from "react";
import { Router } from "./Router";

const RoutingContext = React.createContext<Router>({} as Router);

export default RoutingContext;
