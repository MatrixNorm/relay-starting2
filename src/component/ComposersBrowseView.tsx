import * as React from "react";
import { useState } from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment, usePreloadedQuery } from "react-relay/hooks";
import Link from "../routing/Link";
import * as utils from "../utils";
import * as spec from "../schema";
import type { PreloadedQuery } from "react-relay/hooks";
import type { GraphQLEnumType } from "graphql";
import type {
  ComposersBrowseViewQuery as $Query,
  ComposersBrowseViewQueryVariables as $QueryVars,
  Country,
  WorkKind,
} from "__relay__/ComposersBrowseViewQuery.graphql";
import type {
  ComposersBrowseView_composers,
  ComposersBrowseView_composers$key,
} from "__relay__/ComposersBrowseView_composers.graphql";
import type { PreloadedMatch } from "../routing/Router";

type Composer = NonNullable<ComposersBrowseView_composers["composers"]>[number];

export const Query = graphql`
  query ComposersBrowseViewQuery($country: Country, $workKind: WorkKind) {
    country: __type(name: "Country") {
      enumValues {
        name
      }
    }
    workKind: __type(name: "WorkKind") {
      enumValues {
        name
      }
    }
    ...ComposersBrowseView_composers @arguments(country: $country, workKind: $workKind)
  }
`;

const composersFragment = graphql`
  fragment ComposersBrowseView_composers on Query
  @argumentDefinitions(country: { type: "Country" }, workKind: { type: "WorkKind" }) {
    composers(country: $country) {
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
  }
`;

function ComposersList(props: { composers: ComposersBrowseView_composers$key }) {
  const { composers } = useFragment(composersFragment, props.composers);
  return (
    <div>
      {composers
        ? composers.map((composer) => (
            <ComposerSummary composer={composer} key={composer.id} />
          ))
        : "Nothing to show"}
    </div>
  );
}

function ComposerSummary({ composer }: { composer: Composer }) {
  const { works } = composer;
  return (
    <div>
      <h4>
        <Link to={`/composer/${composer.id}`}>{composer.name}</Link>{" "}
        <i>{composer.country}</i>
      </h4>
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
    </div>
  );
}

export function Main(props: {
  preloadedQuery: PreloadedQuery<$Query>;
  routeData: PreloadedMatch["routeData"];
}) {
  const data = usePreloadedQuery(Query, props.preloadedQuery);
  /*
    __type.enumValues is typed as string array. If introspection query is
    done correctly all these values are in fact of Country type. There is no need to
    do decoding in runtime - more appropriate is to write single unit test.
    And to please Typescript it's ok to do type casting.
  */
  const selectorDomains = {
    country: (data.country?.enumValues || []).map((v) => v.name) as Country[],
    workKind: (data.workKind?.enumValues || []).map((v) => v.name) as WorkKind[],
  };

  const [appliedSelectors, setAppliedSelectors] = useState<$QueryVars>(
    props.preloadedQuery.variables
  );
  const [draftSelectors, setDraftSelectors] = useState<$QueryVars>(appliedSelectors);

  if (props.preloadedQuery.variables !== appliedSelectors) {
    setAppliedSelectors(props.preloadedQuery.variables);
    setDraftSelectors(props.preloadedQuery.variables);
  }

  function isDraftDiffers() {
    // Would be so much better with persistent data structures.
    return JSON.stringify(appliedSelectors) !== JSON.stringify(draftSelectors);
  }

  function handleCancel() {
    if (isDraftDiffers()) {
      setDraftSelectors(appliedSelectors);
    }
  }

  function selectorElement(name: keyof $QueryVars) {
    // wow typing here sucks big time
    // but it's Typescript' fault
    if (selectorDomains[name].length > 0) {
      return (
        <select
          value={draftSelectors[name] || ""}
          onChange={(evt) => {
            // observe how useless is type information here
            let decoder = decode[name];
            let value = decoder(evt.target.value);
            setDraftSelectors((prev) => ({ ...prev, [name]: value }));
          }}
          test-id={`App-${name}-selector`}
        >
          <option value=""></option>
          {selectorDomains[name].map((name, j) => (
            <option value={name} key={j}>
              {name}
            </option>
          ))}
        </select>
      );
    } else {
      return <select disabled test-id={`App-${name}-selector`}></select>;
    }
  }

  return (
    <div>
      {selectorElement("country")}
      {selectorElement("workKind")}

      {isDraftDiffers() && (
        <div>
          <button>
            <Link
              to={`${props.routeData.path}?${new URLSearchParams(
                utils.removeNullAndUndefine(draftSelectors)
              ).toString()}`}
            >
              apply
            </Link>
          </button>
          <button onClick={handleCancel}>cancel</button>
        </div>
      )}

      <div>
        <React.Suspense fallback={"Loading..."}>
          <ComposersList composers={data} />
        </React.Suspense>
      </div>
    </div>
  );
}

/*
  Decoding should be part of spec solution like io-ts, yup, zod, malli.
*/

const decodeStringAsEnum =
  <T extends unknown>(enumType: GraphQLEnumType) =>
  (externalValue: string): T | undefined => {
    const validValues = enumType.getValues().map((v) => v.name);
    return validValues.includes(externalValue) ? (externalValue as T) : undefined;
  };

export const decode = {
  country: decodeStringAsEnum<Country>(spec.Country),
  workKind: decodeStringAsEnum<WorkKind>(spec.WorkKind),
};
