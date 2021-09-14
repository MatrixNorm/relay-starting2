import * as React from "react";
import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import Link from "../routing/Link";
import type {
  ComposerSummary_composer,
  ComposerSummary_composer$key,
} from "__relay__/ComposerSummary_composer.graphql";

const fragmentRef = graphql`
  fragment ComposerSummary_composer on Composer
  @argumentDefinitions(workKind: { type: "WorkKind" }) {
    id
    name
    country
    works(kind: $workKind) {
      id
      name
      kind
      yearOfPublication
    }
  }
`;

export default function ComposerSummary(props: {
  composer: ComposerSummary_composer$key;
}) {
  const data = useFragment(fragmentRef, props.composer);
  return (
    <div>
      <h4>
        <Link to={`/composer/${data.id}`}>{data.name}</Link> <i>{data.country}</i>
      </h4>
      <WorkList works={data.works} />
    </div>
  );
}

function WorkList({ works }: { works: ComposerSummary_composer["works"] }) {
  return (
    <>
      {works ? (
        <ul>
          {works.map((work) => (
            <li key={work.id}>
              <span>{work.name}</span>
              <span> {work.kind}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>This composer is a lazy bummer</div>
      )}
    </>
  );
}
