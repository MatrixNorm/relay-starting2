import * as React from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment, usePreloadedQuery } from "react-relay/hooks";
import RoutingContext from "../routing/RoutingContext";
import Link from "../routing/Link";
import { pushURL } from "../routing/Router";
import * as utils from "../utils";
import * as spec from "../schema";
import type * as typeUtils from "../typeUtils";
import type { PreloadedQuery } from "react-relay/hooks";
import type {
  ComposersBrowseViewQuery,
  Country,
  WorkKind,
  ComposerWindowPaginationPageInput,
} from "__relay__/ComposersBrowseViewQuery.graphql";
import type {
  ComposersBrowseView_composers,
  ComposersBrowseView_composers$key,
} from "__relay__/ComposersBrowseView_composers.graphql";
import type { PreloadedMatch } from "../routing/Router";

export type $Query = ComposersBrowseViewQuery;

//////////////////////
// === FRAGMENT === //
//////////////////////

const composersFragment = graphql`
  fragment ComposersBrowseView_composers on Query
  @argumentDefinitions(input: { type: "ComposerWindowPaginationPageInput" }) {
    composerWindowPagination(input: $input) {
      pageNumber
      pageMaxNumber
      items {
        id
        name
        country
        works {
          id
          name
          kind
          yearOfPublication
        }
      }
    }
  }
`;

function ComposersList(props: {
  composers: ComposersBrowseView_composers$key;
  onPageChange: (pageNumber: number) => void;
}) {
  const { composerWindowPagination: data } = useFragment(
    composersFragment,
    props.composers
  );
  if (!data || !data.items) {
    return <div>Oops... Cannot get data.</div>;
  }
  const { pageNumber, pageMaxNumber } = data;
  return (
    <div>
      <div>
        {data.items.map((composer) => (
          <ComposerSummary composer={composer} key={composer.id} />
        ))}
      </div>
      <div>
        <div>
          {pageNumber > 0 && (
            <button onClick={() => props.onPageChange(pageNumber - 1)}>prev</button>
          )}
          {pageNumber < pageMaxNumber && (
            <button onClick={() => props.onPageChange(pageNumber + 1)}>next</button>
          )}
        </div>
      </div>
    </div>
  );
}

type Composer = NonNullable<
  NonNullable<ComposersBrowseView_composers["composerWindowPagination"]>["items"]
>[number];

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
        <div>Oops... Cannot get data.</div>
      )}
    </div>
  );
}

//////////////////////
// === FRAGMENT === //
//////////////////////

export const Query = graphql`
  query ComposersBrowseViewQuery($input: ComposerWindowPaginationPageInput) {
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
    ...ComposersBrowseView_composers @arguments(input: $input)
  }
`;

export function Main(props: {
  preloadedQuery: PreloadedQuery<$Query>;
  routeData: PreloadedMatch["routeData"];
}) {
  const router = React.useContext(RoutingContext);
  const data = usePreloadedQuery(Query, props.preloadedQuery);

  const paginationParams = props.preloadedQuery.variables.input || {};

  const propsFilters = {
    country: paginationParams.country,
    workKind: paginationParams.workKind,
  };
  /*
    Need this to keep track of filters from paginationParams change between re-renders.
    If they do change then draftFilters are re-setted,
  */
  const [appliedFilters, setAppliedFilters] = React.useState(propsFilters);
  const [draftFilters, setDraftFilters] = React.useState(propsFilters);

  if (!utils.isEqualByValue(appliedFilters, propsFilters)) {
    setAppliedFilters(propsFilters);
    setDraftFilters(propsFilters);
  }

  const filterDomains = {
    country: (data.country?.enumValues || []).map((v) => v.name) as Country[],
    workKind: (data.workKind?.enumValues || []).map((v) => v.name) as WorkKind[],
  };

  function isDraftDifferent() {
    return !utils.isEqualByValue(propsFilters, draftFilters);
  }

  function handleCancelDraftFilters() {
    if (isDraftDifferent()) {
      setDraftFilters(propsFilters);
    }
  }

  function handleCommitDraftFilters() {
    pushURL(
      router,
      props.routeData.path,
      encodeComposerWindowPaginationPageInput({
        ...draftFilters,
        pageNumber: undefined,
      })
    );
  }

  const onPageChange = React.useCallback(
    (requestedPageNumber: number) => {
      pushURL(
        router,
        props.routeData.path,
        encodeComposerWindowPaginationPageInput({
          ...appliedFilters,
          pageNumber: requestedPageNumber,
        })
      );
    },
    [appliedFilters]
  );

  function filterElement(name: "country" | "workKind") {
    if (filterDomains[name].length > 0) {
      return (
        <select
          value={draftFilters[name] || ""}
          onChange={(evt) => {
            let decodedValue = decodeComposerWindowPaginationPageInput({
              [name]: evt.target.value,
            });
            setDraftFilters((prev) => ({ ...prev, [name]: decodedValue[name] }));
          }}
          test-id={`App-${name}-selector`}
        >
          <option value=""></option>
          {filterDomains[name].map((name, j) => (
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
      {filterElement("country")}
      {filterElement("workKind")}

      {isDraftDifferent() && (
        <div>
          <button onClick={handleCommitDraftFilters}>apply</button>
          <button onClick={handleCancelDraftFilters}>cancel</button>
        </div>
      )}

      <div>
        <React.Suspense fallback={"Loading..."}>
          <ComposersList composers={data} onPageChange={onPageChange} />
        </React.Suspense>
      </div>
    </div>
  );
}

/* DECODE / ENCODE

  Decoding should be part of spec solution like io-ts, yup, zod, malli
  to eliminate debilitating manual coding.

  (def ComposerWindowPaginationPageInput 
    [:map
      [:country Country]
      [:workKind WorkKind]
      [:pageNumber Integer]
    ])

  (m/decode 
    ComposerWindowPaginationPageInput
    {:country "Russia"
     :workKind "PEANO_CONCERTO"
     :pageNumber "1"}
    mt/json-transformer)
  ; {:country "Russia" :pageNumber 1}
*/

export const decodeComposerWindowPaginationPageInput = (() => {
  const __decode = {
    country: utils.decodeStringAsEnumFactory<Country>(spec.Country),
    workKind: utils.decodeStringAsEnumFactory<WorkKind>(spec.WorkKind),
    pageNumber: utils.decodeStringAsInt,
  };

  return function (
    externalValue: unknown
  ): Partial<typeUtils.Denull<ComposerWindowPaginationPageInput>> {
    if (utils.isObject(externalValue)) {
      return {
        country: __decode.country(externalValue.country),
        workKind: __decode.workKind(externalValue.workKind),
        pageNumber: __decode.pageNumber(externalValue.pageNumber),
      };
    }
    return {};
  };
})();

function encodeComposerWindowPaginationPageInput(
  input: ComposerWindowPaginationPageInput
) {
  return utils.encodeShallow(input);
}
