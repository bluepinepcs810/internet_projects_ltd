import toastr from 'toastr';

export const showError = (message) => {
  if (typeof message === 'object') {
    showError((message).message);
    return;
  }
  if (Array.isArray(message)) {
    message.forEach(item => showError(item));
    return;
  }
  toastr.options = {
    positionClass: 'toast-bottom-full-width',
    hideDuration: 300,
    timeOut: 5000,
  };

  toastr.error(message);
};

export const showSuccess = (message) => {
  if (typeof message === 'object') {
    showSuccess((message).message);
    return;
  }
  toastr.options = {
    positionClass: 'toast-bottom-full-width',
    hideDuration: 300,
    timeOut: 5000,
  };
  toastr.success(message);
};
