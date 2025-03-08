import { type Dropdown, toggleDropdown } from './index';

export function initMouseClicks(dropdown: Dropdown) {
  dropdown.trigger.addEventListener('click', (event) => {
    event.preventDefault();
    toggleDropdown(dropdown);
  });
}
