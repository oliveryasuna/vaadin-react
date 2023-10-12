import MyComponent, {MyComponentProps} from './MyComponent';
import {createRoot} from 'react-dom/client';
import {registerConnector, registerUpdater} from 'Frontend/src/react/react-utils';
import React from 'react';

const MyComponentWrapper: React.FC<MyComponentProps> = ((initialProps: MyComponentProps): JSX.Element => {
  const [currentProps, setProps] = React.useState(initialProps);

  registerUpdater('MyComponent', ((newSerializedProps: string): void => {
    setProps(JSON.parse(newSerializedProps));
  }));

  return (
      <MyComponent {...currentProps}/>
  );
});

const MyComponentConnector: ReactComponentConnector = ((target: HTMLElement, serializedProps: string): void => {
  const initialProps: MyComponentProps = JSON.parse(serializedProps);

  createRoot(target)
      .render(<MyComponentWrapper {...initialProps}/>);
});

registerConnector('MyComponent', MyComponentConnector);
