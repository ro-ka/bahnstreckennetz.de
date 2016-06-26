/**
 * The site header
 */
export default class {
  /**
   * Initialize
   */
  constructor() {
    this.container = document.querySelector('.site-header');
    this.toggle = this.container.querySelector('.site-header__toggle');

    if (this.toggle) {
      this.toggle.addEventListener('click', () => {
        this.container.classList.toggle('site-header--show-content');
      });
    }
  }
}
