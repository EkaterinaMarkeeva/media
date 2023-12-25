export default class Validate {
  constructor(target) {
    this.target = target;

    this.safelyValidate = this.safelyValidate.bind(this);
    this.validate = this.validate.bind(this);
  }

  validate(value) {
    const re = new RegExp('^[\\[]?[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?),\\s*[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)[\\]]?$', 'm');

    if (!re.test(value)) {
      throw new Error('Координаты введены не корректно');
    }

    return true;
  }

  safelyValidate(elem) {
    try {
      this.validate(this.target.position);

      const position = this.target.position.split('').filter(el => el !== '[' && el !== ']' && el !== ' ').join('').split(',');
      const latitude = position[0];
      const longitude = position[1];
  
      this.target.position = {latitude, longitude}

      const tooltip = document.querySelector('.tooltip-error');
      
      if (tooltip) {
        tooltip.remove();
      }

      elem.remove();

      this.target.processingDataMessage();
    } catch(error) {
      const input = elem.querySelector('.input');

      this.target.view.createTooltip(error.message, input);
    }
  }
}