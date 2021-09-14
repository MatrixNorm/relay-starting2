import * as React from "react";
import { usePreloadedQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import Link from "../routing/Link";
import type { PreloadedQuery } from "react-relay";
import type { ComposerViewQuery } from "__relay__/ComposerViewQuery.graphql";

export const Query = graphql`
  query ComposerViewQuery($composerId: ID!) {
    composerById(composerId: $composerId) {
      id
      name
      country
    }
  }
`;

export function ComposerView(props: {
  preloadedQuery: PreloadedQuery<ComposerViewQuery>;
  routeData: any;
  children: any;
}) {
  const data = usePreloadedQuery(Query, props.preloadedQuery);

  if (data.composerById) {
    return (
      <div>
        <h3>{data.composerById.name}</h3>
        <nav>
          <Link to={props.routeData.url}>Default</Link>
          <span> </span>
          <Link to={`${props.routeData.url}/bio`}>Bio</Link>
        </nav>
        {props.children}
      </div>
    );
  } else {
    return <div>Not found</div>;
  }
}
