export default class View {
  constructor(target) {
    this.target = target;
    this.lastElem = null;
  }

  createInput() {
    const input = document.createElement('input');

    input.classList.add('input');

    input.type = 'text';

    this.lastElem = input;
    
    input.addEventListener("keypress", this.target.onEnterTapeHandler);

    this.target.container.appendChild(input);
  }

  createMessage(content, position, date) {
    const message = document.createElement('div');
    const bodyMessage = document.createElement('div');
    const textMessage = document.createElement('p');
    const dateMessage = document.createElement('time');
    const coords = document.createElement('div');

    message.classList.add('message');
    bodyMessage.classList.add('message__body');
    textMessage.classList.add('message__body_text');
    dateMessage.classList.add('message__body_time');
    coords.classList.add('message__coords');

    dateMessage.textContent = new Date(Number(date)).toLocaleTimeString('ru-RU', {hour: '2-digit',  minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'});
    coords.textContent = `[${position.latitude}, ${position.longitude}]`;

    if (typeof content === 'string') {
      textMessage.textContent = content;
    }

    bodyMessage.appendChild(textMessage);
    bodyMessage.appendChild(dateMessage);
    message.appendChild(bodyMessage);
    message.appendChild(coords);
    
    this.target.container.insertBefore(message, this.lastElem);
  }

  createPopupError() {
    const popup = document.createElement('div');
    const title = document.createElement('h2');
    const text = document.createElement('p');
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const buttons = document.createElement('div');
    const btnClose = document.createElement('button');
    const btnOk = document.createElement('button');

    popup.classList.add('popup');
    title.classList.add('popup_title');
    text.classList.add('popup_text');
    label.classList.add('label');
    input.classList.add('input');
    buttons.classList.add('buttons');
    btnOk.classList.add('btn');
    btnOk.classList.add('btn-ok');
    btnClose.classList.add('btn');
    btnClose.classList.add('btn-close');

    input.id = 'coords';
    input.type = 'text';

    input.setAttribute('novalidate', true);
    label.setAttribute('for', 'coords');
    input.setAttribute('required', true);

    title.textContent = 'Что-то пошло не так';
    text.textContent = 'К сожалению нам не удалось определить Ваше местоположение. Пожалуйста, дайте разрешение на использование геолокации, либо введите данные вручную.';
    label.textContent = 'Широта и долгота через запятую';
    btnOk.textContent = 'Ok';
    btnClose.textContent = 'Отмена';

    btnOk.addEventListener('click', this.target.onClick);
    btnClose.addEventListener('click', this.target.onClick);

    div.appendChild(label);
    div.appendChild(input);
    buttons.appendChild(btnOk);
    buttons.appendChild(btnClose);
    popup.appendChild(title);
    popup.appendChild(text);
    popup.appendChild(div);
    popup.appendChild(buttons);

    this.target.container.appendChild(popup);
  }

  createTooltip(message, elem) {
    const tooltip = document.createElement('div');

    tooltip.classList.add('tooltip-error');

    tooltip.textContent = message;

    document.body.appendChild(tooltip);

    const { left, bottom } = elem.getBoundingClientRect();
    
    tooltip.style.top = bottom + 5 + 'px';
    tooltip.style.left = left + 'px';
  }
}