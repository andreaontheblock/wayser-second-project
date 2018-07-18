function main () {
  const form = document.getElementById('sort-form');
  const submitButton = document.getElementById('sort-submit');
  const select = document.getElementById('sort-select');

  submitButton.remove();

  function submit () {
    form.submit();
  }
  select.addEventListener('change', submit);
}

window.addEventListener('load', main);
