import {Queue} from 'typescript-collections';
import React from 'react';
import {createRoot} from 'react-dom/client';

function createConnectorComponent<
    Props extends {}
>(
    type: (React.FC<Props> | React.ComponentClass<Props>)
): ReactComponentConnectorComponent<Props>;
function createConnectorComponent<
    Props extends {}
>(
    type: React.ClassType<Props, React.ClassicComponent<Props, React.ComponentState>, React.ClassicComponentClass<Props>>
): ReactComponentConnectorComponent<Props>;
function createConnectorComponent<
    Props extends {},
    Type extends React.Component<Props, React.ComponentState>,
    Class extends React.ComponentClass<Props>
>(
    type: React.ClassType<Props, Type, Class>
): ReactComponentConnectorComponent<Props> {
  return ((props: ReactComponentConnectorComponentProps<Props>): JSX.Element => {
    const [currentProps, setCurrentProps] = React.useState(props.initialProps);

    registerUpdater(
        type,
        props.reactId,
        ((serializedProps: string): void => {
          setCurrentProps(JSON.parse(serializedProps));
        })
    );

    return React.createElement(type, currentProps);
  });
}

function createConnector<
    Props extends {}
>(
    type: (React.FC<Props> | React.ComponentClass<Props>)
): ReactComponentConnector;
function createConnector<
    Props extends {}
>(
    type: React.ClassType<Props, React.ClassicComponent<Props, React.ComponentState>, React.ClassicComponentClass<Props>>
): ReactComponentConnector;
function createConnector<
    Props extends {},
    Type extends React.Component<Props, React.ComponentState>,
    Class extends React.ComponentClass<Props>
>(
    type: React.ClassType<Props, Type, Class>
): ReactComponentConnector {
  return ((target: HTMLElement, reactId: ReactId, serializedInitialProps: string): void => {
    const initialProps: Props = JSON.parse(serializedInitialProps);

    const connectorComponent: ReactComponentConnectorComponent<Props> = createConnectorComponent(type);

    createRoot(target)
        .render(React.createElement(
            connectorComponent,
            {
              reactId: reactId,
              initialProps: initialProps
            }
        ));
  });
}

function registerConnector<
    Props extends {}
>(
    type: (React.FC<Props> | React.ComponentClass<Props>),
    connector: ReactComponentConnector
): void;
function registerConnector<
    Props extends {}
>(
    type: React.ClassType<Props, React.ClassicComponent<Props, React.ComponentState>, React.ClassicComponentClass<Props>>,
    connector: ReactComponentConnector
): void;
function registerConnector<
    Props extends {},
    Type extends React.Component<Props, React.ComponentState>,
    Class extends React.ComponentClass<Props>
>(
    type: React.ClassType<Props, Type, Class>,
    connector: ReactComponentConnector
): void {
  if(!window.VaadinReact || !window.VaadinReact.components) {
    throw (new Error('React integration not initialized.'));
  }

  const componentName: string = (type as any).name;

  window.VaadinReact.components[componentName] = {
    connector: connector,
    updaters: new Map()
  };
}

function registerUpdater<
    Props extends {}
>(
    type: (React.FC<Props> | React.ComponentClass<Props>),
    reactId: ReactId,
    updater: ReactComponentUpdater
): void;
function registerUpdater<
    Props extends {}
>(
    type: React.ClassType<Props, React.ClassicComponent<Props, React.ComponentState>, React.ClassicComponentClass<Props>>,
    reactId: ReactId,
    updater: ReactComponentUpdater
): void;
function registerUpdater<
    Props extends {},
    Type extends React.Component<Props, React.ComponentState>,
    Class extends React.ComponentClass<Props>
>(
    type: React.ClassType<Props, Type, Class>,
    reactId: ReactId,
    updater: ReactComponentUpdater
): void {
  if(!window.VaadinReact || !window.VaadinReact.components) {
    throw (new Error('React integration not initialized.'));
  }

  const componentName: string = (type as any).name;

  if(!window.VaadinReact.components[componentName]) {
    throw (new Error(`Component ${componentName} not registered.`));
  }

  // TODO: Why does this happen?
  if(window.VaadinReact.components[componentName].updaters.has(reactId)) {
    return;
  }

  window.VaadinReact.components[componentName].updaters.set(reactId, updater);

  executePendingUpdates(componentName, reactId);
}

const executePendingUpdates = ((componentName: string, reactId: ReactId): void => {
  if(!window.VaadinReact || !window.VaadinReact.components || !window.VaadinReact.pendingUpdates) {
    throw (new Error('React integration not initialized.'));
  }

  const key: ReactPendingUpdatesKey = `${componentName}-${reactId}`;

  const pendingUpdates: (Queue<ReactPendingUpdate> | undefined) = window.VaadinReact.pendingUpdates.get(key);

  if(!pendingUpdates) {
    return;
  }

  while(!pendingUpdates.isEmpty()) {
    const pendingUpdate: ReactPendingUpdate = pendingUpdates.dequeue()!;

    window.VaadinReact.components[componentName]!.updaters.get(reactId)!(pendingUpdate.serializedProps);
  }
});

export {
  createConnectorComponent,
  createConnector,
  registerConnector,
  registerUpdater,
  executePendingUpdates
};
