/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Country = "Austria" | "France" | "Germany" | "Italy" | "Poland" | "Russia" | "%future added value";
export type WorkKind = "BALLET_SUITE" | "OPERA" | "PIANO_CONCERTO" | "PIANO_ETUDE" | "PIANO_PRELUDE" | "PIANO_SONATA" | "STRING_QUARTET" | "SYMPHONY" | "%future added value";
export type ComposersBrowseViewInitialQueryVariables = {
    country?: Country | null;
    workKind?: WorkKind | null;
};
export type ComposersBrowseViewInitialQueryResponse = {
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
    readonly composers: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"ComposerSummary_composer">;
    }> | null;
};
export type ComposersBrowseViewInitialQuery = {
    readonly response: ComposersBrowseViewInitialQueryResponse;
    readonly variables: ComposersBrowseViewInitialQueryVariables;
};



/*
query ComposersBrowseViewInitialQuery(
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
  composers(country: $country) {
    id
    ...ComposerSummary_composer_15hxLD
  }
}

fragment ComposerSummary_composer_15hxLD on Composer {
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
v5 = [
  {
    "kind": "Variable",
    "name": "country",
    "variableName": "country"
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
    "name": "ComposersBrowseViewInitialQuery",
    "selections": [
      (v3/*: any*/),
      (v4/*: any*/),
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": "Composer",
        "kind": "LinkedField",
        "name": "composers",
        "plural": true,
        "selections": [
          (v6/*: any*/),
          {
            "args": [
              {
                "kind": "Variable",
                "name": "workKind",
                "variableName": "workKind"
              }
            ],
            "kind": "FragmentSpread",
            "name": "ComposerSummary_composer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ComposersBrowseViewInitialQuery",
    "selections": [
      (v3/*: any*/),
      (v4/*: any*/),
      {
        "alias": null,
        "args": (v5/*: any*/),
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
    "cacheID": "70e98841a33ce718da60cccef695f551",
    "id": null,
    "metadata": {},
    "name": "ComposersBrowseViewInitialQuery",
    "operationKind": "query",
    "text": "query ComposersBrowseViewInitialQuery(\n  $country: Country\n  $workKind: WorkKind\n) {\n  country: __type(name: \"Country\") {\n    enumValues {\n      name\n    }\n  }\n  workKind: __type(name: \"WorkKind\") {\n    enumValues {\n      name\n    }\n  }\n  composers(country: $country) {\n    id\n    ...ComposerSummary_composer_15hxLD\n  }\n}\n\nfragment ComposerSummary_composer_15hxLD on Composer {\n  id\n  name\n  country\n  works(kind: $workKind) {\n    id\n    name\n    kind\n    yearOfPublication\n  }\n}\n"
  }
};
})();
(node as any).hash = '8ae33da95a5096f21ad827701dd32ef6';
export default node;
