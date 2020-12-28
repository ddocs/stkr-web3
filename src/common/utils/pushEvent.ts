import { isProd } from './isProd';

export function pushEvent(event: string, values: {}) {
  debugger;
  if (!window.dataLayer) {
    if (isProd()) {
      console.warn("Data layer hasn't been initialized");
    }
    return;
  }

  window.dataLayer.push({
    event,
    ...values,
  });
}
