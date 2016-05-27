import Map from './components/map';
import UserPosition from './components/user-position';

/**
 * The main Application
 */
class App {
  /**
   * Initialize
   */
  constructor() {
    this.map = new Map({onLoad: mapCanvas => {
      this.userPosition.initialize(mapCanvas);
    }});
    this.userPosition = new UserPosition();
  }
}

window.app = new App();
