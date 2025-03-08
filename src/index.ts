import './index.css';

import { initNavDropdowns } from './nav-dropdowns';

// initNavDropdowns();

window.Webflow ||= [];
window.Webflow.push(() => {
  initNavDropdowns({
    dropDownSelector: '[emr_nav_menu_dropdown]',
    triggerSelector: '[emr_element="nav_menu_dropdown_button"]',
    subMenuSelector: '[emr_element="nav_menu_dropdown_content"]',
    hoverDelay: 1000,
  });
});
