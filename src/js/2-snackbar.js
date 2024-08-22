import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', formSubmit);
function formSubmit(event) {
  event.preventDefault();

  const { delay, state } = event.currentTarget.elements;
  createPromise(delay.value, state.value)
    .then(delay => {
      iziToast.success({
        position: 'topRight',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        position: 'topRight',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
  event.currentTarget.reset();
}

function createPromise(currentDelay, currentState) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (currentState === 'fulfilled') {
        resolve(currentDelay);
      } else {
        reject(currentDelay);
      }
    }, currentDelay);
  });
}