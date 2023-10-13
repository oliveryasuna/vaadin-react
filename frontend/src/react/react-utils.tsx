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
    const [currentProps, setCurrentProps] = React.useState(props.props);

    registerUpdater(
        type,
        props.name,
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
  return ((target: HTMLElement, name: ReactComponentName, reactId: ReactComponentId, serializedInitialProps: string): void => {
    const initialProps: Props = JSON.parse(serializedInitialProps);

    const connectorComponent: ReactComponentConnectorComponent<Props> = createConnectorComponent(type);

    createRoot(target)
        .render(React.createElement(
            connectorComponent,
            {
              name: name,
              reactId: reactId,
              props: initialProps
            }
        ));
  });
}

function registerConnector<
    Props extends {}
>(
    name: ReactComponentName,
    type: (React.FC<Props> | React.ComponentClass<Props>),
    connector: ReactComponentConnector
): void;
function registerConnector<
    Props extends {}
>(
    name: ReactComponentName,
    type: React.ClassType<Props, React.ClassicComponent<Props, React.ComponentState>, React.ClassicComponentClass<Props>>,
    connector: ReactComponentConnector
): void;
function registerConnector<
    Props extends {},
    Type extends React.Component<Props, React.ComponentState>,
    Class extends React.ComponentClass<Props>
>(
    name: ReactComponentName,
    type: React.ClassType<Props, Type, Class>,
    connector: ReactComponentConnector
): void {
  if(!window.VaadinReact || !window.VaadinReact.components) {
    throw (new Error('React integration not initialized.'));
  }

  window.VaadinReact.components[name] = {
    connector: connector,
    updaters: new Map()
  };
}

function registerUpdater<
    Props extends {}
>(
    type: (React.FC<Props> | React.ComponentClass<Props>),
    name: ReactComponentName,
    reactId: ReactComponentId,
    updater: ReactComponentUpdater
): void;
function registerUpdater<
    Props extends {}
>(
    type: React.ClassType<Props, React.ClassicComponent<Props, React.ComponentState>, React.ClassicComponentClass<Props>>,
    name: ReactComponentName,
    reactId: ReactComponentId,
    updater: ReactComponentUpdater
): void;
function registerUpdater<
    Props extends {},
    Type extends React.Component<Props, React.ComponentState>,
    Class extends React.ComponentClass<Props>
>(
    type: React.ClassType<Props, Type, Class>,
    name: ReactComponentName,
    reactId: ReactComponentId,
    updater: ReactComponentUpdater
): void {
  if(!window.VaadinReact || !window.VaadinReact.components) {
    throw (new Error('React integration not initialized.'));
  }

  if(!window.VaadinReact.components[name]) {
    throw (new Error(`Component ${name} not registered.`));
  }

  // TODO: Why does this happen?
  if(window.VaadinReact.components[name].updaters.has(reactId)) {
    return;
  }

  window.VaadinReact.components[name].updaters.set(reactId, updater);

  executePendingUpdates(name, reactId);
}

const executePendingUpdates = ((name: ReactComponentName, reactId: ReactComponentId): void => {
  if(!window.VaadinReact || !window.VaadinReact.components || !window.VaadinReact.pendingUpdates) {
    throw (new Error('React integration not initialized.'));
  }

  const key: ReactPendingUpdatesKey = `${name}-${reactId}`;

  const pendingUpdates: (Queue<ReactPendingUpdate> | undefined) = window.VaadinReact.pendingUpdates.get(key);

  if(!pendingUpdates) {
    return;
  }

  while(!pendingUpdates.isEmpty()) {
    const pendingUpdate: ReactPendingUpdate = pendingUpdates.dequeue()!;

    window.VaadinReact.components[name]!.updaters.get(reactId)!(pendingUpdate.serializedProps);
  }
});

export {
  createConnectorComponent,
  createConnector,
  registerConnector,
  registerUpdater,
  executePendingUpdates
};
