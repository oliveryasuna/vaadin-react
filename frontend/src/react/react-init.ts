import {Queue} from 'typescript-collections';

window.Vaadin = (window.Vaadin ?? {});
window.Vaadin.React = (window.Vaadin.React ?? {
  components: {},
  pendingUpdates: new Map(),
  scheduleUpdate: ((id: string, serializedProps: string): void => {
    // If the component already has an updater, use it.
    if(window.Vaadin.React.components[id]?.updater) {
      window.Vaadin.React.components[id]!.updater!(serializedProps);

      return;
    }

    if(!window.Vaadin.React.pendingUpdates.get(id)) {
      window.Vaadin.React.pendingUpdates.set(id, new Queue());
    }

    window.Vaadin.React.pendingUpdates.get(id)!.enqueue(serializedProps);
  })
});
