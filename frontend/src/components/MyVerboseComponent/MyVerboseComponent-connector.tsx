import MyVerboseComponent, {MyVerboseComponentProps} from './MyVerboseComponent';
import {createRoot} from 'react-dom/client';
import {registerConnector, registerUpdater} from 'Frontend/src/react/react-utils';
import React from 'react';

const MyVerboseComponentWrapper: React.FC<MyVerboseComponentProps> = ((initialProps: MyVerboseComponentProps): JSX.Element => {
  const [currentProps, setCurrentProps] = React.useState(initialProps);

  registerUpdater(MyVerboseComponent, ((newSerializedProps: string): void => {
    setCurrentProps(JSON.parse(newSerializedProps));
  }));

  return (
      <MyVerboseComponent {...currentProps}/>
  );
});

const MyVerboseComponentConnector: ReactComponentConnector = ((target: HTMLElement, serializedProps: string): void => {
  const initialProps: MyVerboseComponentProps = JSON.parse(serializedProps);

  createRoot(target)
      .render(<MyVerboseComponentWrapper {...initialProps}/>);
});

registerConnector(MyVerboseComponent, MyVerboseComponentConnector);
