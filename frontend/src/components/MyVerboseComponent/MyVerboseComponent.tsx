import React from 'react';

type MyVerboseComponentProps = {
  name?: string;
};

const MyVerboseComponent: React.FC<MyVerboseComponentProps> = ((props: MyVerboseComponentProps): JSX.Element => {
  return (
      <div>Hello, {props.name}!</div>
  );
});

export default MyVerboseComponent;
export type {
  MyVerboseComponentProps
};
