import ReactGA from 'react-ga';

const useAnalyticsEventTracker = (category = '') => {
  const eventTracker = (args: Omit<ReactGA.EventArgs, 'category'>) => {
    gtag('event', category, {
      action: args.action,
      label: args.label,
      value: args.value,
    });
  };
  return eventTracker;
};
export default useAnalyticsEventTracker;
