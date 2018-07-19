function main () {
  const serviceProvider = window.service.serviceProvider;
  document.getElementById('email-submit').addEventListener('click', function () {
    toastr.info(`Email sent successfully to ${serviceProvider}`);
  });
}

window.addEventListener('load', main);
