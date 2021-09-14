/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ComposerViewBioQueryVariables = {
    composerId: string;
};
export type ComposerViewBioQueryResponse = {
    readonly composerById: {
        readonly bio: string | null;
    } | null;
};
export type ComposerViewBioQuery = {
    readonly response: ComposerViewBioQueryResponse;
    readonly variables: ComposerViewBioQueryVariables;
};



/*
query ComposerViewBioQuery(
  $composerId: ID!
) {
  composerById(composerId: $composerId) {
    bio
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
  "name": "bio",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ComposerViewBioQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Composer",
        "kind": "LinkedField",
        "name": "composerById",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "ComposerViewBioQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Composer",
        "kind": "LinkedField",
        "name": "composerById",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2505472c1fba95980824b30384c8f1a1",
    "id": null,
    "metadata": {},
    "name": "ComposerViewBioQuery",
    "operationKind": "query",
    "text": "query ComposerViewBioQuery(\n  $composerId: ID!\n) {\n  composerById(composerId: $composerId) {\n    bio\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '35677eb0510efe6815e7e72c1d0008f5';
export default node;
