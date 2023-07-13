"use strict";

const form = document.querySelector('form');
const nameInput = document.querySelector('input[type="text"][placeholder="Example: Maram Nahshal"]');
const emailInput = document.querySelector('input[type="text"][placeholder="Example:Maram@gmail.com"]');
const dateInput = document.querySelector('input[type="text"][placeholder="mm/dd/yy"]');
const timeInput = document.querySelector('input[type="text"][placeholder="00:00pm"]');
const partySizeInput = document.querySelector('input[type="text"][placeholder="Example: 4 people"]');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const date = dateInput.value.trim();
  const time = timeInput.value.trim();
  const partySize = partySizeInput.value.trim();

  let errorFlag = false;

  // Validate name input
  if (name.length < 6) {
    displayErrorMessage(nameInput, 'Must be at least 6 characters.');
    errorFlag = true;
  } else {
    removeErrorMessage(nameInput);
  }

  // Validate email input
  if (email.length < 12 || !email.includes('@')) {
    displayErrorMessage(emailInput, 'Enter a valid email. Must include @');
    errorFlag = true;
  } else {
    removeErrorMessage(emailInput);
  }

  // Validate date input
  const dateRegex = /^\d{2}\/\d{2}\/\d{2}$/;
  if (!dateRegex.test(date)) {
    displayErrorMessage(dateInput, 'Enter a valid date. Format: mm/dd/yy');
    errorFlag = true;
  } else {
    removeErrorMessage(dateInput);
  }

  // Validate time input
  const timeRegex = /^(0[0-9]|1[0-1]):[0-5][0-9] (pm)$/;
  if (!timeRegex.test(time)) {
    displayErrorMessage(
      timeInput,
      'Enter a valid time. Example: 09:30 pm. Restaurant hours: 12:00 pm to 11:45 pm'
    );
    errorFlag = true;
  } else {
    removeErrorMessage(timeInput);
  }

  // Validate party size input
  if (isNaN(partySize) || partySize <= 0) {
    displayErrorMessage(partySizeInput, 'Enter a positive number.');
    errorFlag = true;
  } else {
    removeErrorMessage(partySizeInput);
  }

  if (errorFlag) {
    return;
  }

  // Display success message and reset form
  alert('Reservation submitted successfully.');
  form.reset();
});

// Function to display an error message next to or under the input field
function displayErrorMessage(inputElement, errorMessage) {
  const errorElement = inputElement.nextElementSibling;
  if (errorElement && errorElement.classList.contains('error-message')) {
    errorElement.textContent = errorMessage;
  } else {
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = errorMessage;
    inputElement.parentNode.insertBefore(errorElement, inputElement.nextElementSibling);
  }
}

// Function to remove the error message next to or under the input field
function removeErrorMessage(inputElement) {
  const errorElement = inputElement.nextElementSibling;
  if (errorElement && errorElement.classList.contains('error-message')) {
    inputElement.parentNode.removeChild(errorElement);
  }
}
