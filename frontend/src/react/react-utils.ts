import {Queue} from 'typescript-collections';

const registerConnector = ((componentName: ReactComponentName, connector: ReactComponentConnector) => {
  window.Vaadin = (window.Vaadin ?? {});
  window.Vaadin.React = (window.Vaadin.React ?? {});
  window.Vaadin.React.components = (window.Vaadin.React.components ?? {});
  window.Vaadin.React.components[componentName] = (window.Vaadin.React.components[componentName] ?? {});

  window.Vaadin.React.components[componentName]!.connector = connector;
});

const registerUpdater = ((componentName: ReactComponentName, updater: ReactComponentUpdater) => {
  window.Vaadin = (window.Vaadin ?? {});
  window.Vaadin.React = (window.Vaadin.React ?? {});
  window.Vaadin.React.components = (window.Vaadin.React.components ?? {});
  window.Vaadin.React.components[componentName] = (window.Vaadin.React.components[componentName] ?? {});

  window.Vaadin.React.components[componentName]!.updater = updater;

  executePendingUpdates(componentName);
});

const executePendingUpdates = ((componentName: ReactComponentName) => {
  const pendingUpdates: (Queue<string> | undefined) = window.Vaadin.React.pendingUpdates.get(componentName);

  if(!pendingUpdates) {
    return;
  }

  while(!pendingUpdates.isEmpty()) {
    window.Vaadin.React.components[componentName]!.updater!(pendingUpdates.dequeue()!);
  }
});

export {
  registerConnector,
  registerUpdater,
  executePendingUpdates
};
