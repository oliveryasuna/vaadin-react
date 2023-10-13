import {CSSResultGroup} from 'lit/development';
import {Queue} from 'typescript-collections';
import React from 'react';

declare global {
  declare module '*.css' {
    import {CSSResultGroup} from 'lit';
    const content: CSSResultGroup;
    export default content;
  }

  // React
  //--------------------------------------------------

  type ReactComponentName = string;
  type ReactComponentId = string;

  type ReactComponentConnector = ((target: HTMLElement, name: ReactComponentName, reactId: ReactComponentId, serializedInitialProps: string) => void);
  type ReactComponentConnectorComponentProps<Props> = {
    name: ReactComponentName,
    reactId: ReactComponentId,
    props: Props
  }
  type ReactComponentConnectorComponent<Props = {}> = React.FC<ReactComponentConnectorComponentProps<Props>>;

  type ReactComponentUpdater = ((serializedProps: string) => void);

  type ReactComponentHelper = {
    connector: ReactComponentConnector,
    updaters: Map<ReactComponentId, ReactComponentUpdater>
  };

  type ReactPendingUpdate = {
    id: ReactComponentId,
    serializedProps: string
  };
  type ReactPendingUpdatesKey = `${string}-${ReactComponentId}`

  interface Window {
    VaadinReact: {
      components?: Record<ReactComponentName, ReactComponentHelper>;
      pendingUpdates?: Map<ReactPendingUpdatesKey, Queue<ReactPendingUpdate>>,
      scheduleUpdate?: ((name: ReactComponentName, reactId: ReactComponentId, serializedProps: string) => void)
    };
  }
}
