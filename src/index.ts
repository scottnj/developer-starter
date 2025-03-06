import './index.css';

import { initNavDropdowns } from './nav-dropdowns';

window.Webflow ||= [];
window.Webflow.push(() => {
  initNavDropdowns();
});
