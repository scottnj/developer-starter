import { closeDropdown, type Dropdown, openDropdown } from './index';

let timeoutId: number | null = null;

function closeDropdownWithTimeout(dropdown: Dropdown, delay: number) {
  timeoutId = setTimeout(() => {
    closeDropdown(dropdown);
  }, delay); // Delay of 300ms (adjust as needed)
}

function timeoutReset() {
  if (timeoutId) clearTimeout(timeoutId);
}

export function initMouseOver(dropdown: Dropdown, delay: number) {
  dropdown.trigger.addEventListener('mouseover', () => {
    timeoutReset();
    openDropdown(dropdown);
  });

  dropdown.trigger.addEventListener('mouseout', () => {
    closeDropdownWithTimeout(dropdown, delay);
  });

  dropdown.subMenu.addEventListener('mouseover', () => {
    timeoutReset();
  });

  dropdown.subMenu.addEventListener('mouseout', () => {
    closeDropdownWithTimeout(dropdown, delay);
  });
}
