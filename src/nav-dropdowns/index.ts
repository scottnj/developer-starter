// https://www.a11y-collective.com/blog/mastering-web-accessibility-making-drop-down-menus-user-friendly/

// TODO: Add awareness of when a user tabs out of the menu
// TODO: debounce mouse over
// TODO: Accessible drop-down menus for touchscreen users

let expandedItem: Element | null = null;

function openDropdown(dropdown: Element) {
  if (expandedItem) closeDropdown(expandedItem);
  const { button, content } = getDropdownButtonAndContent(dropdown);
  dropdown.setAttribute('emr_nav_menu_dropdown', 'opened');
  button.setAttribute('aria-expanded', 'true');
  content.setAttribute('aria-hidden', 'false');
  content.querySelectorAll('a')[0].focus(); // Focus on the first link in the submenu
  expandedItem = dropdown;
}

function closeDropdown(dropdown: Element) {
  const { button, content } = getDropdownButtonAndContent(dropdown);
  dropdown.setAttribute('emr_nav_menu_dropdown', 'closed');
  button.setAttribute('aria-expanded', 'false');
  content.setAttribute('aria-hidden', 'true');
  button.focus(); // Focus back on the button
  expandedItem = null;
}

function getDropdownButtonAndContent(dropdown: Element) {
  const button = dropdown.querySelector(
    '[emr_element="nav_menu_dropdown_button"]'
  ) as HTMLButtonElement;
  const content = dropdown.querySelector(
    '[emr_element="nav_menu_dropdown_content"]'
  ) as HTMLDivElement;
  return { button, content };
}

function onDropdownClick(dropdown: Element) {
  if (expandedItem === dropdown) closeDropdown(dropdown);
  else openDropdown(dropdown);
}

export function initNavDropdowns() {
  document.querySelectorAll('[emr_nav_menu_dropdown]').forEach((dropdown) => {
    const { button } = getDropdownButtonAndContent(dropdown);

    button.addEventListener('click', () => {
      onDropdownClick(dropdown);
    });

    button.addEventListener('mouseenter', () => {
      openDropdown(dropdown);
    });

    button.addEventListener('mouseleave', () => {
      closeDropdown(dropdown);
    });

    // Handling keyboard navigation
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        // Space or Enter key
        event.preventDefault(); // Prevent the default action to stop scrolling when pressing Space
        if (button.ariaExpanded === 'false') {
          openDropdown(dropdown);
        } else {
          closeDropdown(dropdown);
        }
      }
    });

    // Handling tab key inside submenu to loop back to the button
    const subMenuLinks = dropdown.querySelectorAll('a');
    if (subMenuLinks.length) {
      const lastLink = subMenuLinks[subMenuLinks.length - 1];
      lastLink.addEventListener('keydown', (event) => {
        if (event.key === 'Tab' && !event.shiftKey) {
          event.preventDefault();
          button.focus(); // Move focus back to the button
        }
      });
    }
  });
}
