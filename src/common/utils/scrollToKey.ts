import { smoothScrollTo } from './smoothScroll';

export const scrollToKey = (key: string) => {
  const el = document.querySelector(`#${key}`);
  if (!el) {
    return;
  }

  const { height, top } = el.getBoundingClientRect();
  const target = window.scrollY + top - (window.innerHeight - height) / 2;

  smoothScrollTo(window, target, 600);
};

export const scrollAlignToKey = (source: HTMLElement, key: string) => {
  const el = document.querySelector(`#${key}`);
  if (!el) {
    return;
  }

  const { top } = el.getBoundingClientRect();
  const { top: sourceTop } = source.getBoundingClientRect();
  const target = window.scrollY + top - sourceTop;

  smoothScrollTo(window, target, 600);
};
