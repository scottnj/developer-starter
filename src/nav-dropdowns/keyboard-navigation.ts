import { closeDropdown, type Dropdown, expandedItem, toggleDropdown } from './index';

/*
 * Navigation items are usually static, so this approach works and is
 * more efficient. If items are added or removed dynamically, you might
 * have to query the items lists on each keypress.
 */

function getAllFocusableElements(parent: Element | Document): HTMLElement[] {
  return Array.from(
    parent.querySelectorAll(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    )
  )
    .filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true')
    .map((el) => el as HTMLElement);
}

// function getNextFocusableElement() {
//   const { activeElement } = document;
//   if (!activeElement) return { prevItem: null, nextItem: null };
//
//   const focusableElements = getAllFocusableElements(document);
//
//   const focusableElementsArray = Array.from(focusableElements);
//   const currentIndex = focusableElementsArray.indexOf(activeElement);
//   const nextIndex = (currentIndex + 1) % focusableElementsArray.length;
//   const prevIndex = (currentIndex - 1) % focusableElementsArray.length;
//   const nextItem = focusableElementsArray[nextIndex];
//   const prevItem = focusableElementsArray[prevIndex];
//   return { prevItem, nextItem };
// }

function initToggleDropdownOnSpaceOrEnter(dropdown: Dropdown) {
  dropdown.trigger.addEventListener('keydown', (event) => {
    // Space or Enter key
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent the default action to stop scrolling when pressing Space
      toggleDropdown(dropdown);
    }
  });
}

function initSubMenuTabKeys(dropdown: Dropdown) {
  const subMenuLinks = getAllFocusableElements(dropdown.subMenu);
  if (subMenuLinks.length) {
    const firstLink = subMenuLinks[0];
    const lastLink = subMenuLinks[subMenuLinks.length - 1];

    firstLink.addEventListener('keydown', (event) => {
      if (event.key === 'Tab' && event.shiftKey) {
        closeDropdown(dropdown);
      }
    });

    lastLink.addEventListener('keydown', (event) => {
      if (event.key === 'Tab' && !event.shiftKey) {
        closeDropdown(dropdown, false);
        // TODO: Fix Nav Dropdown tab on last element focus back to button.
        // console.log('last link should move focus to button', dropdown.trigger);
        dropdown.trigger.focus(); // Move focus back to the button
      }
    });
  }
}

function initEscapeKeyPress() {
  document.addEventListener('keydown', (event) => {
    const _expandedItem = expandedItem();
    if (event.key === 'Escape' && _expandedItem) closeDropdown(_expandedItem);
  });
}

export function initKeyboardNavigation(dropdown: Dropdown) {
  initToggleDropdownOnSpaceOrEnter(dropdown);
  initSubMenuTabKeys(dropdown);
  initEscapeKeyPress();
}
