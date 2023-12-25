import View from "./view";
import UserGeolocation from "./geolocation";
import Validate from "./validate";

export default class Tape {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this.container = container;
    this.view = new View(this);
    this.geolocation = new UserGeolocation(this);
    this.validate = new Validate(this);
    this.position = null;
    this.message = null;

    this.onEnterTapeHandler = this.onEnterTapeHandler.bind(this);
    this.processingDataMessage = this.processingDataMessage.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  init() {
    this.view.createInput();
  }

  onEnterTapeHandler(e) {
    if (e.keyCode === 13) {
      const elem = e.target;
      this.message = elem.value;

      this.geolocation.getGeolocation(e);    
    }
  }

  processingDataMessage() {
    const input = document.querySelector('.input');

    if (!this.message) return;

    const date = Date.now();

    this.view.createMessage(this.message, this.position, date);

    input.value = '';
  }

  onClick(e) {
    const elem = e.target;

    const popup = elem.closest('.popup');

    if (elem.className.includes('close')) {
      popup.remove();

      return;
    } else {
      const input = popup.querySelector('.input');
      this.position = input.value.trim();

      this.validate.safelyValidate(popup);
    }
  }
}