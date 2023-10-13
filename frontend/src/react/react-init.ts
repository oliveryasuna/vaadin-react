import {Queue} from 'typescript-collections';

window.VaadinReact = (window.VaadinReact ?? {
  components: {},
  pendingUpdates: new Map(),
  scheduleUpdate: ((name: ReactComponentName, reactId: ReactComponentId, serializedProps: string): void => {
    if(!window.VaadinReact.components![name]) {
      throw (new Error(`Component ${name} not registered.`));
    }

    const update: ReactPendingUpdate = {
      id: reactId,
      serializedProps: serializedProps
    };

    // If the component already has an updater, use it.
    if(window.VaadinReact.components![name]?.updaters.has(reactId)) {
      window.VaadinReact.components![name]!.updaters.get(reactId)!(update.serializedProps);

      return;
    }

    const key: ReactPendingUpdatesKey = `${name}-${reactId}`;

    if(!window.VaadinReact.pendingUpdates!.get(key)) {
      window.VaadinReact.pendingUpdates!.set(key, new Queue());
    }

    window.VaadinReact.pendingUpdates!.get(key)!.enqueue(update);
  })
});
