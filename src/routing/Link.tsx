import * as React from "react";
const { useCallback, useContext } = React;
import RoutingContext from "./RoutingContext";

type Props = {
  to: string;
  children?: any;
};

/**
 * An alternative to react-router's Link component that works with
 * our custom RoutingContext.
 */
export default function Link(props: Props) {
  const router = useContext(RoutingContext);

  // When the user clicks, change route
  const changeRoute = useCallback(
    (event) => {
      console.log(props.to);
      event.preventDefault();
      router.history.push(props.to);
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
