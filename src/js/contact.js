import '../css/contact.css';

const form = document.getElementById('contact-form');
const dialog = document.getElementById('contact-dialog');
const closeBtn = document.getElementById('close-dialog');

form.onsubmit = (e) => {
  e.preventDefault();

  // pieni validointi on jo HTML required/email avulla
  form.reset();
  dialog.showModal();
};

closeBtn.onclick = () => dialog.close();
