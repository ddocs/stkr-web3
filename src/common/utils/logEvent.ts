import ReactGA from 'react-ga';

export function logEvent(category: string, action: string, value?: any) {
  ReactGA.event({
    category,
    action,
    value,
  });
}
