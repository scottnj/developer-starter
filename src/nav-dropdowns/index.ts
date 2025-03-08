/*
 * Refactored version of
 * https://www.a11y-collective.com/blog/mastering-web-accessibility-making-drop-down-menus-user-friendly/
 */

import { initKeyboardNavigation } from './keyboard-navigation';
import { initMouseClicks } from './mouse-clicks';
import { initMouseOver } from './mouse-hover';

export type Dropdown = {
  wrapper: HTMLElement;
  trigger: HTMLElement;
  subMenu: HTMLElement;
};

let _expandedItem: Dropdown | null = null;

export function expandedItem() {
  return _expandedItem;
}

export function openDropdown(dropdown: Dropdown) {
  // only allows one dropdown to be expanded at a time
  if (_expandedItem) closeDropdown(_expandedItem, true);

  dropdown.wrapper.setAttribute('emr_nav_menu_dropdown', 'opened');
  dropdown.trigger.setAttribute('aria-expanded', 'true');
  dropdown.subMenu.removeAttribute('inert');
  dropdown.subMenu.querySelectorAll('a')[0].focus(); // Focus on the first link in the submenu
  _expandedItem = dropdown;
}

export function closeDropdown(dropdown: Dropdown, skipFocus: boolean = false) {
  if (!skipFocus) dropdown.trigger.focus(); // Focus back on the button
  dropdown.wrapper.setAttribute('emr_nav_menu_dropdown', 'closed');
  dropdown.trigger.setAttribute('aria-expanded', 'false');
  dropdown.subMenu.setAttribute('inert', 'true');
  _expandedItem = null;
}

export function toggleDropdown(dropdown: Dropdown) {
  if (_expandedItem === dropdown) {
    closeDropdown(dropdown);
  } else {
    openDropdown(dropdown);
  }
}

export function initNavDropdowns({
  dropDownSelector = '[emr_nav_menu_dropdown]',
  triggerSelector = '[emr_element="nav_menu_dropdown_button"]',
  subMenuSelector = '[emr_element="nav_menu_dropdown_content"]',
  hoverDelay = 300,
}: {
  dropDownSelector: string;
  triggerSelector: string;
  subMenuSelector: string;
  hoverDelay: number;
}) {
  document.querySelectorAll(dropDownSelector).forEach((wrapper) => {
    const trigger = wrapper.querySelector(triggerSelector) as HTMLElement;
    const subMenu = wrapper.querySelector(subMenuSelector) as HTMLElement;
    const dropdown: Dropdown = { wrapper: wrapper as HTMLElement, trigger, subMenu };

    // initialize aria attributes
    closeDropdown(dropdown, true);

    // init mouse clicks
    initMouseClicks(dropdown);

    // init mouse over
    initMouseOver(dropdown, hoverDelay);

    // init keyboard navigation
    initKeyboardNavigation(dropdown);
  });
}
