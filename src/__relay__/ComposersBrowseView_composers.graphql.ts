/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Country = "Austria" | "France" | "Germany" | "Italy" | "Poland" | "Russia" | "%future added value";
export type WorkKind = "BALLET_SUITE" | "OPERA" | "PIANO_CONCERTO" | "PIANO_ETUDE" | "PIANO_PRELUDE" | "PIANO_SONATA" | "STRING_QUARTET" | "SYMPHONY" | "%future added value";
export type ComposersBrowseView_composers = {
    readonly composers: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly country: Country | null;
        readonly works: ReadonlyArray<{
            readonly id: string;
            readonly name: string;
            readonly kind: WorkKind | null;
            readonly yearOfPublication: number | null;
        }> | null;
    }> | null;
    readonly " $refType": "ComposersBrowseView_composers";
};
export type ComposersBrowseView_composers$data = ComposersBrowseView_composers;
export type ComposersBrowseView_composers$key = {
    readonly " $data"?: ComposersBrowseView_composers$data;
    readonly " $fragmentRefs": FragmentRefs<"ComposersBrowseView_composers">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [
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
  "kind": "Fragment",
  "metadata": null,
  "name": "ComposersBrowseView_composers",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "country",
          "variableName": "country"
        }
      ],
      "concreteType": "Composer",
      "kind": "LinkedField",
      "name": "composers",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
            (v0/*: any*/),
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
  "type": "Query",
  "abstractKey": null
};
})();
(node as any).hash = 'a42965b03c945800be83c2f5b283d72d';
export default node;
