import * as React from "react";
const { useCallback, useContext } = React;
import RoutingContext from "./RoutingContext";

/**
 * An alternative to react-router's Link component that works with
 * our custom RoutingContext.
 */
export default function Link(props: { to: string; children?: any }) {
  const router = useContext(RoutingContext);

  // When the user clicks, change route
  const changeRoute = useCallback(
    (event) => {
      event.preventDefault();
      // Walk-around this bug or feature
      // https://github.com/remix-run/history/issues/859
      const url = new URL(props.to, "https://lmao.kek");
      router.history.push({ pathname: url.pathname, search: url.search });
    },
    [props.to, router]
  );

  // Callback data for the route:
  // we pass this to onMouseDown, since this is a stronger
  // signal that the user will likely complete the navigation
  // const preloadRoute = useCallback(() => {
  //   router.preload(props.to);
  // }, [props.to, router]);

  return (
    <a href={props.to} onClick={changeRoute}>
      {props.children}
    </a>
  );
}
