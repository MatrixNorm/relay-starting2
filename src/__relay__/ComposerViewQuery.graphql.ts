/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type Country = "Austria" | "France" | "Germany" | "Italy" | "Poland" | "Russia" | "%future added value";
export type ComposerViewQueryVariables = {
    composerId: string;
};
export type ComposerViewQueryResponse = {
    readonly composerById: {
        readonly id: string;
        readonly name: string;
        readonly country: Country | null;
    } | null;
};
export type ComposerViewQuery = {
    readonly response: ComposerViewQueryResponse;
    readonly variables: ComposerViewQueryVariables;
};



/*
query ComposerViewQuery(
  $composerId: ID!
) {
  composerById(composerId: $composerId) {
    id
    name
    country
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "composerId",
        "variableName": "composerId"
      }
    ],
    "concreteType": "Composer",
    "kind": "LinkedField",
    "name": "composerById",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
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
        "name": "country",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ComposerViewQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ComposerViewQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7866d90e89f82074c8e091e643603ce5",
    "id": null,
    "metadata": {},
    "name": "ComposerViewQuery",
    "operationKind": "query",
    "text": "query ComposerViewQuery(\n  $composerId: ID!\n) {\n  composerById(composerId: $composerId) {\n    id\n    name\n    country\n  }\n}\n"
  }
};
})();
(node as any).hash = '427b9a64e013d75124d67d10afa967d1';
export default node;
