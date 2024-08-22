import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const dayOutput = document.querySelector('[data-days]');
const hoursOutput = document.querySelector('[data-hours]');
const minutesOutput = document.querySelector('[data-minutes]');
const secondOutput = document.querySelector('[data-seconds]');

let intervalId = null;
let curentSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      iziToast.error({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true; // Disable the start button if the date is in the past
    } else {
      curentSelectedDate = selectedDates[0];
      startButton.disabled = false; // Enable the start button if the date is in the future
    }
  },
};

flatpickr(datePicker, options);

startButton.addEventListener('click', startTimer);

function startTimer() {
  datePicker.disabled = true;
  startButton.disabled = true;

  intervalId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const curentTime = curentSelectedDate - new Date();

  if (curentTime <= 0) {
    clearInterval(intervalId);
    datePicker.disabled = false;
    startButton.disabled = true; // Disable the start button again
    updateTimerDisplay(0, 0, 0, 0); // Reset timer display to 00:00:00:00
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(curentTime);
  updateTimerDisplay(days, hours, minutes, seconds);
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  dayOutput.textContent = String(days).padStart(2, '0');
  hoursOutput.textContent = String(hours).padStart(2, '0');
  minutesOutput.textContent = String(minutes).padStart(2, '0');
  secondOutput.textContent = String(seconds).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}