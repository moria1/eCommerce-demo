import React from "react";
import {Context} from "./Context";

const WrapContext = WrappedComponent => {
  const Wrapped = props => {
    return (
      <Context.Consumer>
        {context => <WrappedComponent {...props} context={context} />}
      </Context.Consumer>
    );
  };

  return Wrapped;
};

export default WrapContext;