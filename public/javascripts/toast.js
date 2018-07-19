function main () {
  var c = document.getElementById('email-submit');
  console.log(c);
  document.getElementById('email-submit').addEventListener('click', function () {
    console.log('hello');
    toastr.info('Email sent successfuly');
  });
}

window.addEventListener('load', main);
