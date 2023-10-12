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

  type ReactComponentConnector = ((target: HTMLElement, serializedProps: string) => void);
  type ReactComponentConnectorComponent<Props = {}> = React.FC<Props>;

  type ReactComponentUpdater = ((serializedProps: string) => void);

  type ReactComponentHelper = {
    connector?: ReactComponentConnector,
    updater?: ReactComponentUpdater
  };

  interface Window {
    Vaadin: {
      React: {
        components: Record<string, ReactComponentHelper>;
        pendingUpdates: Map<string, Queue<string>>,
        scheduleUpdate: ((id: string, serializedProps: string) => void)
      }
    };
  }
}
