import * as React from "react";
import { usePreloadedQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import Link from "../routing/Link";
import type { PreloadedQuery } from "react-relay";
import type { ComposerViewDefaultQuery } from "__relay__/ComposerViewDefaultQuery.graphql";

export const Query = graphql`
  query ComposerViewDefaultQuery($composerId: ID!) {
    composerById(composerId: $composerId) {
      works {
        id
        name
        kind
        yearOfPublication
      }
    }
  }
`;

export function ComposerViewDefault(props: {
  preloadedQuery: PreloadedQuery<ComposerViewDefaultQuery>;
  routeData: any;
}) {
  const data = usePreloadedQuery(Query, props.preloadedQuery);

  if (data.composerById) {
    const { works } = data.composerById;
    return works ? (
      <ul>
        {works.map((work) => (
          <li key={work.id}>
            <Link to={`${props.routeData.url}/work/${work.id}`}>{work.name} </Link>
            <span> {work.kind}</span>
          </li>
        ))}
      </ul>
    ) : (
      <div>This composer is a lazy bummer</div>
    );
  } else {
    <div>Not found</div>;
  }
}
