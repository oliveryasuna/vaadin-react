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

  type ReactId = string;

  type ReactComponentConnector = ((target: HTMLElement, reactId: ReactId, serializedInitialProps: string) => void);
  type ReactComponentConnectorComponentProps<Props> = {
    reactId: ReactId,
    initialProps: Props
  }
  type ReactComponentConnectorComponent<Props = {}> = React.FC<ReactComponentConnectorComponentProps<Props>>;

  type ReactComponentUpdater = ((serializedProps: string) => void);

  type ReactComponentHelper = {
    connector: ReactComponentConnector,
    updaters: Map<ReactId, ReactComponentUpdater>
  };

  type ReactPendingUpdate = {
    reactId: ReactId,
    serializedProps: string
  };
  type ReactPendingUpdatesKey = `${string}-${ReactId}`

  interface Window {
    VaadinReact: {
      components?: Record<string, ReactComponentHelper>;
      pendingUpdates?: Map<ReactPendingUpdatesKey, Queue<ReactPendingUpdate>>,
      scheduleUpdate?: ((componentName: string, reactId: ReactId, serializedProps: string) => void)
    };
  }
}
