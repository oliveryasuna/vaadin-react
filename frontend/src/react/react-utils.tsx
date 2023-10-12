import {Queue} from 'typescript-collections';
import React from 'react';
import {createRoot} from 'react-dom/client';

function createConnectorComponent<Props extends {}>(type: (React.FunctionComponent<Props> | React.ComponentClass<Props>)): ReactComponentConnectorComponent<Props>;
function createConnectorComponent<Props extends {}>(type: React.ClassType<Props, React.ClassicComponent<Props, React.ComponentState>, React.ClassicComponentClass<Props>>): ReactComponentConnectorComponent<Props>;
function createConnectorComponent<Props extends {}, Type extends React.Component<Props, React.ComponentState>, Class extends React.ComponentClass<Props>>(type: React.ClassType<Props, Type, Class>): ReactComponentConnectorComponent<Props> {
  return ((initialProps: Props): JSX.Element => {
    const [currentProps, setCurrentProps] = React.useState(initialProps);

    registerUpdater(type, ((newSerializedProps: string): void => {
      setCurrentProps(JSON.parse(newSerializedProps));
    }));

    return React.createElement(type, currentProps);
  });
}

function createConnector<Props extends {}>(component: ReactComponentConnectorComponent<Props>): ReactComponentConnector {
  return ((target: HTMLElement, serializedProps: string): void => {
    const initialProps: Props = JSON.parse(serializedProps);

    createRoot(target)
        .render(React.createElement(component, initialProps));
  });
}

function registerConnector<Props extends {}>(type: (React.FunctionComponent<Props> | React.ComponentClass<Props>), connector: ReactComponentConnector): void;
function registerConnector<Props extends {}>(type: React.ClassType<Props, React.ClassicComponent<Props, React.ComponentState>, React.ClassicComponentClass<Props>>, connector: ReactComponentConnector): void;
function registerConnector<Props extends {}, Type extends React.Component<Props, React.ComponentState>, Class extends React.ComponentClass<Props>>(type: React.ClassType<Props, Type, Class>, connector: ReactComponentConnector): void {
  window.Vaadin = (window.Vaadin ?? {});
  window.Vaadin.React = (window.Vaadin.React ?? {});
  window.Vaadin.React.components = (window.Vaadin.React.components ?? {});

  const id: string = (type as any).name;

  window.Vaadin.React.components[id] = (window.Vaadin.React.components[id] ?? {});

  window.Vaadin.React.components[id]!.connector = connector;
}

function registerUpdater<Props extends {}>(type: (React.FunctionComponent<Props> | React.ComponentClass<Props>), updater: ReactComponentUpdater): void;
function registerUpdater<Props extends {}>(type: React.ClassType<Props, React.ClassicComponent<Props, React.ComponentState>, React.ClassicComponentClass<Props>>, updater: ReactComponentUpdater): void;
function registerUpdater<Props extends {}, Type extends React.Component<Props, React.ComponentState>, Class extends React.ComponentClass<Props>>(type: React.ClassType<Props, Type, Class>, updater: ReactComponentUpdater): void {
  window.Vaadin = (window.Vaadin ?? {});
  window.Vaadin.React = (window.Vaadin.React ?? {});
  window.Vaadin.React.components = (window.Vaadin.React.components ?? {});

  const id: string = (type as any).name;

  window.Vaadin.React.components[id] = (window.Vaadin.React.components[id] ?? {});

  window.Vaadin.React.components[id]!.updater = updater;

  executePendingUpdates(id);
}

const executePendingUpdates = ((id: string): void => {
  const pendingUpdates: (Queue<string> | undefined) = window.Vaadin.React.pendingUpdates.get(id);

  if(!pendingUpdates) {
    return;
  }

  while(!pendingUpdates.isEmpty()) {
    window.Vaadin.React.components[id]!.updater!(pendingUpdates.dequeue()!);
  }
});

export {
  createConnectorComponent,
  createConnector,
  registerConnector,
  registerUpdater,
  executePendingUpdates
};
