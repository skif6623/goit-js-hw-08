import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const CURRENT_FORM_VALUE = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
};

initPage();

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmint);

function onFormInput(evt) {
  const { name, value } = evt.target;

  let saveData = load(CURRENT_FORM_VALUE);
  saveData = saveData ? saveData : {};

  saveData[name] = value;
  save(CURRENT_FORM_VALUE, saveData);
}
function initPage() {
  const saveData = load(CURRENT_FORM_VALUE);

  if (!saveData) {
    return;
  }

  Object.entries(saveData).forEach(([name, value]) => {
    refs.form.elements[name].value = value;
  });
}

function onFormSubmint(evt) {
  evt.preventDefault();

  const { email, message } = evt.currentTarget.elements;

  console.log({ email: email.value, message: message.value });
  evt.currentTarget.reset();
  remove(CURRENT_FORM_VALUE);
}
