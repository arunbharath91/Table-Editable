
const formButton = (elem: HTMLElement) => {
  /*this function is for button click to send ajax-data*/
  const inputRow = elem.querySelectorAll('tr[data-row]');
  const inputRowArray = Array.prototype.slice.call(inputRow);
  let newObj: { [x: string]: any; }[] = [];

  /*for iterate through number of obj */
  inputRowArray.forEach((rowItem, rowIndex) => {
    const $cells = rowItem.querySelectorAll('[data-edit-input]');
    const $cellsArray = Array.prototype.slice.call($cells);
    newObj[rowIndex] = {};
    $cellsArray.forEach((cellItem) => {
      newObj[rowIndex][cellItem.getAttribute('data-edit-input').replace(/(^.*\[|\].*$)/g, '')] = cellItem.innerHTML;
    });
  });

  const button = elem.querySelector('[data-update]') as HTMLElement;
  const apiUrl = button.getAttribute('data-update')
  if (apiUrl) {
    button.setAttribute('disabled', 'true');
    fetch(apiUrl, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
      button.setAttribute('disabled', 'false');
    }).finally(() => {
      button.setAttribute('disabled', 'false');
    });
  } else {
    throw new Error('Provide data update value');
  }


}

class FormEdit {
  private target: HTMLElement;
  constructor(e: any) {
    this.target = e.target;
    this.eventRegistration();
  }

  private eventRegistration() {
    const inputChk = this.target.getAttribute('data-edit-input') || '';
    if (inputChk.replace(/\s*\[.*?\]\s*/g, '') == 'input') {
      const value = this.target.innerHTML;
      this.target.innerHTML = '<div class="dataedit"><input type="text" class="form-control" value="' + value + '"/></div>';

      const eventBinder = this.target.getElementsByTagName('input')[0];
      eventBinder.focus();
      eventBinder.addEventListener('blur', () => {
        (eventBinder.value) ? this.target.innerHTML = eventBinder.value : alert('value must be filled');
      });
    }
  }

};

/*this function is for form data-edit-input selector*/
const form = document.querySelectorAll('form[data-edit-form]');
const formArray = Array.prototype.slice.call(form);
formArray.forEach((item) => {
  item.addEventListener('click', (e: any) => {
    new FormEdit(e);
  });
  item.querySelector('button').addEventListener('click', () => {
    formButton(item)
  });
});
