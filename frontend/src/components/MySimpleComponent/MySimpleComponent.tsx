import React from 'react';
import {createConnector, createConnectorComponent, registerConnector} from 'Frontend/src/react/react-utils';

type MySimpleComponentProps = {
  name?: string;
};

const MySimpleComponent: React.FC<MySimpleComponentProps> = ((props: MySimpleComponentProps): JSX.Element => {
  return (
      <div>Hello, {props.name}!</div>
  );
});

registerConnector(MySimpleComponent, createConnector(createConnectorComponent(MySimpleComponent)));

export default MySimpleComponent;
export type {
  MySimpleComponentProps
};
