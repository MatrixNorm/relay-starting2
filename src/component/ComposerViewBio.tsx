import * as React from "react";
import { usePreloadedQuery } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import type { PreloadedQuery } from "react-relay";
import type { ComposerViewBioQuery } from "__relay__/ComposerViewBioQuery.graphql";

export const Query = graphql`
  query ComposerViewBioQuery($composerId: ID!) {
    composerById(composerId: $composerId) {
      bio
    }
  }
`;

export function ComposerViewBio(props: {
  preloadedQuery: PreloadedQuery<ComposerViewBioQuery>;
}) {
  const data = usePreloadedQuery(Query, props.preloadedQuery);
  const composer = data.composerById;
  return composer ? <div>{composer.bio}</div> : <div>Not found</div>;
}
