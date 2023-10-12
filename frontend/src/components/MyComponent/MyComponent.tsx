import React from 'react';

type MyComponentProps = {
  name: string;
};

const MyComponent: React.FC<MyComponentProps> = ((props: MyComponentProps): JSX.Element => {
  return (
      <div>Hello, {props.name}!</div>
  );
});

export default MyComponent;
export type {
  MyComponentProps
};
