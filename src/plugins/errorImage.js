// src/directives/errorImage.js
export default {
  inserted(el) {
    const defaultFallback = 'https://theyworkforyou.github.io/shineyoureye-images/Static/assets/images/person-250x250.png'; // Default fallback image URL
    el.onerror = () => {
      el.src = defaultFallback;
    };
  },
};
