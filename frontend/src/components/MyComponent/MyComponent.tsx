import React from 'react';
import {createConnector, registerConnector} from 'Frontend/src/react/react-utils';

type MyComponentProps = {
  name?: string;
};

const MyComponent: React.FC<MyComponentProps> = ((props: MyComponentProps): JSX.Element => {
  return (
      <div>Hello, {props.name}!</div>
  );
});

registerConnector('MyComponent', MyComponent, createConnector(MyComponent));

export default MyComponent;
export type {
  MyComponentProps
};
