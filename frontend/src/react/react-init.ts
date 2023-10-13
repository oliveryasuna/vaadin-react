import {Queue} from 'typescript-collections';

window.VaadinReact = (window.VaadinReact ?? {
  components: {},
  pendingUpdates: new Map(),
  scheduleUpdate: ((componentName: string, reactId: ReactId, serializedProps: string): void => {
    if(!window.VaadinReact.components![componentName]) {
      throw (new Error(`Component ${componentName} not registered.`));
    }

    const update: ReactPendingUpdate = {
      reactId: reactId,
      serializedProps: serializedProps
    };

    // If the component already has an updater, use it.
    if(window.VaadinReact.components![componentName]?.updaters.has(reactId)) {
      window.VaadinReact.components![componentName]!.updaters.get(reactId)!(update.serializedProps);

      return;
    }

    const key: ReactPendingUpdatesKey = `${componentName}-${reactId}`;

    if(!window.VaadinReact.pendingUpdates!.get(key)) {
      window.VaadinReact.pendingUpdates!.set(key, new Queue());
    }

    window.VaadinReact.pendingUpdates!.get(key)!.enqueue(update);
  })
});
