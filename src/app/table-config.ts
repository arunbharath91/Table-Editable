import { FormEdit, formButton } from "./table";

/*this function is for form data-edit-input selector*/
const form = document.querySelector('form[data-edit-form]') as HTMLElement;

  form.addEventListener('click', (e: any) => {
    new FormEdit(e);
  });


  (document.querySelector('#formButton') as HTMLElement).addEventListener('click', () => {
    formButton(form);
  });
