import { loadQuery } from "react-relay/hooks";
import NotFound404 from "./component/NotFound404";
import ThrowComponent from "./component/Throw";
import Header from "./component/Header";
import HomeView from "./component/HomeView";
import * as ComposersBrowseView from "./component/ComposersBrowseView";
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
        component: ComposersBrowseView.Main,
        preload: (_, location) => {
          //@ts-ignore
          const qArgs = Object.fromEntries(new URLSearchParams(location.search));
          const { decode } = ComposersBrowseView;
          return {
            query: loadQuery(relayEnv, ComposersBrowseView.Query, {
              country: decode.country(qArgs.country),
              workKind: decode.workKind(qArgs.workKind),
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
