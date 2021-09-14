import * as React from "react";

type State = {
  hasError: boolean;
};

type Props = {
  key: string;
};

export default class CatchError extends React.Component<Props> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>SHIIIITEEEE</h1>;
    }
    return this.props.children;
  }
}
