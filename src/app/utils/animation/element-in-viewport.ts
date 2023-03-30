export const IS_ELEMENT_IN_VIEWPORT = (
  targetElement: HTMLElement,
  callback: Function,
  rootMargin = '0px',
  threshold = 0.8
): void => {
  const options = {
    rootMargin,
    threshold,
  };
  const observer = new IntersectionObserver(callback.bind(this), options);
  observer.observe(targetElement);
};
