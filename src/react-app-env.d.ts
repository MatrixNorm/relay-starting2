// fixes typescript error when importing babel-plugin-relay/macro
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35707
declare module "babel-plugin-relay/macro" {
  export { graphql as default } from "react-relay";
}
