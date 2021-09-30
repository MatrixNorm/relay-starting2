/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Country = "Austria" | "France" | "Germany" | "Italy" | "Poland" | "Russia" | "%future added value";
export type WorkKind = "BALLET_SUITE" | "OPERA" | "PIANO_CONCERTO" | "PIANO_ETUDE" | "PIANO_PRELUDE" | "PIANO_SONATA" | "STRING_QUARTET" | "SYMPHONY" | "%future added value";
export type ComposerWindowPaginationPageInput = {
    country?: Country | null;
    workKind?: WorkKind | null;
    pageNumber?: number | null;
};
export type ComposersBrowseViewQueryVariables = {
    input?: ComposerWindowPaginationPageInput | null;
};
export type ComposersBrowseViewQueryResponse = {
    readonly country: {
        readonly enumValues: ReadonlyArray<{
            readonly name: string;
        }> | null;
    } | null;
    readonly workKind: {
        readonly enumValues: ReadonlyArray<{
            readonly name: string;
        }> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ComposersBrowseView_composers">;
};
export type ComposersBrowseViewQuery = {
    readonly response: ComposersBrowseViewQueryResponse;
    readonly variables: ComposersBrowseViewQueryVariables;
};



/*
query ComposersBrowseViewQuery(
  $input: ComposerWindowPaginationPageInput
) {
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
  ...ComposersBrowseView_composers_2VV6jB
}

fragment ComposersBrowseView_composers_2VV6jB on Query {
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "__EnumValue",
    "kind": "LinkedField",
    "name": "enumValues",
    "plural": true,
    "selections": [
      (v1/*: any*/)
    ],
    "storageKey": null
  }
],
v3 = {
  "alias": "country",
  "args": [
    {
      "kind": "Literal",
      "name": "name",
      "value": "Country"
    }
  ],
  "concreteType": "__Type",
  "kind": "LinkedField",
  "name": "__type",
  "plural": false,
  "selections": (v2/*: any*/),
  "storageKey": "__type(name:\"Country\")"
},
v4 = {
  "alias": "workKind",
  "args": [
    {
      "kind": "Literal",
      "name": "name",
      "value": "WorkKind"
    }
  ],
  "concreteType": "__Type",
  "kind": "LinkedField",
  "name": "__type",
  "plural": false,
  "selections": (v2/*: any*/),
  "storageKey": "__type(name:\"WorkKind\")"
},
v5 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ComposersBrowseViewQuery",
    "selections": [
      (v3/*: any*/),
      (v4/*: any*/),
      {
        "args": (v5/*: any*/),
        "kind": "FragmentSpread",
        "name": "ComposersBrowseView_composers"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ComposersBrowseViewQuery",
    "selections": [
      (v3/*: any*/),
      (v4/*: any*/),
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "ComposerWindowPaginationPage",
        "kind": "LinkedField",
        "name": "composerWindowPagination",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "pageNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "pageMaxNumber",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Composer",
            "kind": "LinkedField",
            "name": "items",
            "plural": true,
            "selections": [
              (v6/*: any*/),
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "country",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Work",
                "kind": "LinkedField",
                "name": "works",
                "plural": true,
                "selections": [
                  (v6/*: any*/),
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "kind",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "yearOfPublication",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d2be496c7cada25f1bddb3e0757af797",
    "id": null,
    "metadata": {},
    "name": "ComposersBrowseViewQuery",
    "operationKind": "query",
    "text": "query ComposersBrowseViewQuery(\n  $input: ComposerWindowPaginationPageInput\n) {\n  country: __type(name: \"Country\") {\n    enumValues {\n      name\n    }\n  }\n  workKind: __type(name: \"WorkKind\") {\n    enumValues {\n      name\n    }\n  }\n  ...ComposersBrowseView_composers_2VV6jB\n}\n\nfragment ComposersBrowseView_composers_2VV6jB on Query {\n  composerWindowPagination(input: $input) {\n    pageNumber\n    pageMaxNumber\n    items {\n      id\n      name\n      country\n      works {\n        id\n        name\n        kind\n        yearOfPublication\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5c3adb3881681ca4d4b2ebc32b21bcdf';
export default node;
