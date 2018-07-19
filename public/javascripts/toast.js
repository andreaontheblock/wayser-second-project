function main () {
  // var c = document.getElementById('email-submit');
  // // window.service;
  // // var serviceProvider = windows;
  // // console.log(serviceProvider);
  // console.log(c);
  document.getElementById('email-submit').addEventListener('click', function () {
    console.log('hello');
    toastr.info('Email sent successfully');
  });
}

window.addEventListener('load', main);
