import * as React from "react";
import graphql from "babel-plugin-relay/macro";
import { useFragment, usePreloadedQuery } from "react-relay/hooks";
import RoutingContext from "../routing/RoutingContext";
import Link from "../routing/Link";
import * as utils from "../utils";
import * as spec from "../schema";
import type * as typeUtils from "../typeUtils";
import type { PreloadedQuery } from "react-relay/hooks";
import type { GraphQLEnumType } from "graphql";
import type {
  ComposersBrowseViewQuery as $Query,
  Country,
  WorkKind,
  ComposerWindowPaginationPageInput,
} from "__relay__/ComposersBrowseViewQuery.graphql";
import type {
  ComposersBrowseView_composers,
  ComposersBrowseView_composers$key,
} from "__relay__/ComposersBrowseView_composers.graphql";
import type { PreloadedMatch } from "../routing/Router";

export { $Query };

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
  onPageChange: any;
}) {
  const { composerWindowPagination: data } = useFragment(
    composersFragment,
    props.composers
  );
  return (
    <div>
      <div>
        {data?.items
          ? data.items.map((composer) => (
              <ComposerSummary composer={composer} key={composer.id} />
            ))
          : "Nothing to show"}
      </div>
      <div>
        <div></div>
        <div>
          <button onClick={props.onPageChange((data?.pageNumber || 0) + 1)}>next</button>
        </div>
      </div>
    </div>
  );
}

type Composer = ComposersBrowseView_composers["composerWindowPagination"];

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
  const router = React.useContext(RoutingContext);
  const data = usePreloadedQuery(Query, props.preloadedQuery);

  const paginationParams = props.preloadedQuery.variables.input || {};

  const [prevParams, setPrevParams] =
    React.useState<ComposerWindowPaginationPageInput>(paginationParams);

  const [draftParams, setDraftParams] =
    React.useState<ComposerWindowPaginationPageInput>(paginationParams);

  if (!utils.isEqualByValue(prevParams, paginationParams)) {
    setPrevParams(paginationParams);
    setDraftParams(paginationParams);
  }

  const selectorDomains = {
    country: (data.country?.enumValues || []).map((v) => v.name) as Country[],
    workKind: (data.workKind?.enumValues || []).map((v) => v.name) as WorkKind[],
  };

  function isDraftDiffers() {
    return !utils.isEqualByValue(paginationParams, draftParams);
  }

  function handleCancelDraftParams() {
    if (isDraftDiffers()) {
      setDraftParams(paginationParams);
    }
  }

  function handleCommitDraftParams() {
    let search = new URLSearchParams(
      encodeComposerWindowPaginationPageInput(draftParams)
    ).toString();
    router.history.push({ pathname: props.routeData.path, search });
  }

  const onPageChange = React.useCallback(
    (requestedPageNumber: number) => {
      let search = new URLSearchParams(
        encodeComposerWindowPaginationPageInput({
          ...draftParams,
          pageNumber: requestedPageNumber,
        })
      ).toString();
      router.history.push({ pathname: props.routeData.path, search });
    },
    [props.routeData.path]
  );

  function selectorElement(name: "country" | "workKind") {
    if (selectorDomains[name].length > 0) {
      return (
        <select
          value={draftParams[name] || ""}
          onChange={(evt) => {
            let decodedValue = decodeComposerWindowPaginationPageInput({
              [name]: evt.target.value,
            });
            if (decodedValue[name]) {
              setDraftParams((prev) => ({ ...prev, [name]: decodedValue }));
            }
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
          <button onClick={handleCommitDraftParams}>apply</button>
          <button onClick={handleCancelDraftParams}>cancel</button>
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

/*
  Decoding should be part of spec solution like io-ts, yup, zod, malli.
  Every time parameters in GQL schema are changed decoding must be undated
  manually. This is stupid.
*/

const decodeStringAsEnumFactory =
  <T extends unknown>(enumType: GraphQLEnumType) =>
  (externalValue: string): T | undefined => {
    const validValues = enumType.getValues().map((v) => v.name);
    return validValues.includes(externalValue) ? (externalValue as T) : undefined;
  };

const decodeStringAsInt = (externalValue: string): number | undefined => {
  return parseInt(externalValue) || undefined;
};

const __decode = {
  country: decodeStringAsEnumFactory<Country>(spec.Country),
  workKind: decodeStringAsEnumFactory<WorkKind>(spec.WorkKind),
};

export function decodeComposerWindowPaginationPageInput(
  externalValue: unknown
): Partial<typeUtils.Denull<ComposerWindowPaginationPageInput>> {
  if (utils.isObject(externalValue)) {
    return {
      country: __decode.country(externalValue.country),
      workKind: __decode.workKind(externalValue.workKind),
      pageNumber: decodeStringAsInt(externalValue.pageNumber),
    };
  }
  return {};
}

function encodeComposerWindowPaginationPageInput(
  input: ComposerWindowPaginationPageInput
): { [key: string]: string } {
  return JSON.parse(JSON.stringify(utils.removeNullAndUndefine(input)));
}
