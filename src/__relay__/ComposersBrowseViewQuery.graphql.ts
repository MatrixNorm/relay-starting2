/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Country = "Austria" | "France" | "Germany" | "Italy" | "Poland" | "Russia" | "%future added value";
export type WorkKind = "BALLET_SUITE" | "OPERA" | "PIANO_CONCERTO" | "PIANO_ETUDE" | "PIANO_PRELUDE" | "PIANO_SONATA" | "STRING_QUARTET" | "SYMPHONY" | "%future added value";
export type ComposersBrowseViewQueryVariables = {
    country?: Country | null;
    workKind?: WorkKind | null;
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
  $country: Country
  $workKind: WorkKind
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
  ...ComposersBrowseView_composers_2jCGwZ
}

fragment ComposersBrowseView_composers_2jCGwZ on Query {
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "country"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "workKind"
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
v5 = {
  "kind": "Variable",
  "name": "country",
  "variableName": "country"
},
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
        "args": [
          (v5/*: any*/),
          {
            "kind": "Variable",
            "name": "workKind",
            "variableName": "workKind"
          }
        ],
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
        "args": [
          (v5/*: any*/)
        ],
        "concreteType": "Composer",
        "kind": "LinkedField",
        "name": "composers",
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
            "args": [
              {
                "kind": "Variable",
                "name": "kind",
                "variableName": "workKind"
              }
            ],
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
    ]
  },
  "params": {
    "cacheID": "0abe07e88b5546ebe8387ffd891ec2bd",
    "id": null,
    "metadata": {},
    "name": "ComposersBrowseViewQuery",
    "operationKind": "query",
    "text": "query ComposersBrowseViewQuery(\n  $country: Country\n  $workKind: WorkKind\n) {\n  country: __type(name: \"Country\") {\n    enumValues {\n      name\n    }\n  }\n  workKind: __type(name: \"WorkKind\") {\n    enumValues {\n      name\n    }\n  }\n  ...ComposersBrowseView_composers_2jCGwZ\n}\n\nfragment ComposersBrowseView_composers_2jCGwZ on Query {\n  composers(country: $country) {\n    id\n    name\n    country\n    works(kind: $workKind) {\n      id\n      name\n      kind\n      yearOfPublication\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8c9ffb82cf5e74f5025612217bbf8819';
export default node;
