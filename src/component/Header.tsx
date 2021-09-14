import * as React from "react";
import RoutingContext from "../routing/RoutingContext";
import Link from "../routing/Link";
import CatchError from "./CatchError";

export default function Header(props: { children?: any }) {
  const router = React.useContext(RoutingContext);
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/composers">Composers</Link>
        <Link to="/wrong-url">404</Link>
        <Link to="/throw">Broke it</Link>
      </nav>
      <CatchError key={router.getValue().location.pathname}>{props.children}</CatchError>
    </div>
  );
}
