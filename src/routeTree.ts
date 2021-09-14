import { loadQuery } from "react-relay/hooks";
import NotFound404 from "./component/NotFound404";
import ThrowComponent from "./component/Throw";
import Header from "./component/Header";
import HomeView from "./component/HomeView";
import {
  ComposersBrowseView,
  InitialQuery as ComposersBrowseViewInitialQuery,
} from "./component/ComposersBrowseView";
import { ComposerView, Query as ComposerViewQuery } from "./component/ComposerView";
import {
  ComposerViewDefault,
  Query as ComposerViewDefaultQuery,
} from "./component/ComposerViewDefault";
import {
  ComposerViewBio,
  Query as ComposerViewBioQuery,
} from "./component/ComposerViewBio";

import type { IEnvironment } from "relay-runtime";
import type { RouteTree } from "./routing/Router";

export const getRouteTree = (relayEnv: IEnvironment): RouteTree => [
  {
    component: Header,
    routes: [
      {
        path: "/",
        exact: true,
        component: HomeView,
      },
      {
        path: "/composers",
        component: ComposersBrowseView,
        preload: () => {
          return {
            query: loadQuery(relayEnv, ComposersBrowseViewInitialQuery, {
              country: null,
              workKind: null,
            }),
          };
        },
      },
      {
        path: "/composer/:id",
        component: ComposerView,
        preload: (params: { id: string }) => {
          console.log("ComposerView");
          return {
            query: loadQuery(relayEnv, ComposerViewQuery, {
              composerId: params.id,
            }),
          };
        },
        routes: [
          {
            path: "/composer/:id",
            exact: true,
            component: ComposerViewDefault,
            preload: (params: { id: any }) => {
              console.log("ComposerViewDefault");
              return {
                query: loadQuery(relayEnv, ComposerViewDefaultQuery, {
                  composerId: params.id,
                }),
              };
            },
          },
          {
            path: "/composer/:id/bio",
            component: ComposerViewBio,
            preload: (params: { id: any }) => {
              console.log("ComposerViewBio");
              return {
                query: loadQuery(relayEnv, ComposerViewBioQuery, {
                  composerId: params.id,
                }),
              };
            },
          },
        ],
      },
      {
        path: "/throw",
        component: ThrowComponent,
      },
      {
        path: "*",
        component: NotFound404,
      },
    ],
  },
];
