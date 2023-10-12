import {Queue} from 'typescript-collections';

window.Vaadin = (window.Vaadin ?? {});
window.Vaadin.React = (window.Vaadin.React ?? {
  components: {},
  pendingUpdates: new Map(),
  scheduleUpdate: ((componentName: ReactComponentName, serializedProps: string): void => {
    // If the component already has an updater, use it.
    if(window.Vaadin.React.components[componentName]?.updater) {
      window.Vaadin.React.components[componentName]!.updater!(serializedProps);

      return;
    }

    if(!window.Vaadin.React.pendingUpdates.get(componentName)) {
      window.Vaadin.React.pendingUpdates.set(componentName, new Queue());
    }

    window.Vaadin.React.pendingUpdates.get(componentName)!.enqueue(serializedProps);
  })
});
