/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type WorkKind = "BALLET_SUITE" | "OPERA" | "PIANO_CONCERTO" | "PIANO_ETUDE" | "PIANO_PRELUDE" | "PIANO_SONATA" | "STRING_QUARTET" | "SYMPHONY" | "%future added value";
export type ComposerViewDefaultQueryVariables = {
    composerId: string;
};
export type ComposerViewDefaultQueryResponse = {
    readonly composerById: {
        readonly works: ReadonlyArray<{
            readonly id: string;
            readonly name: string;
            readonly kind: WorkKind | null;
            readonly yearOfPublication: number | null;
        }> | null;
    } | null;
};
export type ComposerViewDefaultQuery = {
    readonly response: ComposerViewDefaultQueryResponse;
    readonly variables: ComposerViewDefaultQueryVariables;
};



/*
query ComposerViewDefaultQuery(
  $composerId: ID!
) {
  composerById(composerId: $composerId) {
    works {
      id
      name
      kind
      yearOfPublication
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "composerId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "composerId",
    "variableName": "composerId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Work",
  "kind": "LinkedField",
  "name": "works",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ComposerViewDefaultQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Composer",
        "kind": "LinkedField",
        "name": "composerById",
        "plural": false,
        "selections": [
          (v3/*: any*/)
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
    "name": "ComposerViewDefaultQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Composer",
        "kind": "LinkedField",
        "name": "composerById",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c962d3f43ef18a6732bd710f1de81403",
    "id": null,
    "metadata": {},
    "name": "ComposerViewDefaultQuery",
    "operationKind": "query",
    "text": "query ComposerViewDefaultQuery(\n  $composerId: ID!\n) {\n  composerById(composerId: $composerId) {\n    works {\n      id\n      name\n      kind\n      yearOfPublication\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '5800c03bb545cc9662794386fb95fee1';
export default node;
