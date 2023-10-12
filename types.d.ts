import {CSSResultGroup} from 'lit/development';
import {Queue} from 'typescript-collections';

declare global {
  declare module '*.css' {
    import {CSSResultGroup} from 'lit';
    const content: CSSResultGroup;
    export default content;
  }

  type CustomEventListener<E extends Event> = (e: E) => void;

  // React
  //--------------------------------------------------

  type ReactComponentName = keyof Window['Vaadin']['React']['components'];

  type ReactComponentConnector = ((target: HTMLElement, serializedProps: string) => void);
  type ReactComponentUpdater = ((serializedProps: string) => void);

  interface Window {
    Vaadin: {
      React: {
        components: {
          MyComponent?: {
            connector?: ReactComponentConnector,
            updater?: ReactComponentUpdater
          }
        },
        pendingUpdates: Map<ReactComponentName, Queue<string>>,
        scheduleUpdate: ((componentName: ReactComponentName, serializedProps: string) => void)
      }
    };
  }
}
