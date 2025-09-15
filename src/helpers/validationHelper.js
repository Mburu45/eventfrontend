/**
 * validationHelper.js
 * Helper functions for form validation
 */

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password
 * @returns {object} {isValid: boolean, errors: array}
 */
export function validatePassword(password) {
  const errors = [];
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate name (not empty, reasonable length)
 * @param {string} name
 * @returns {boolean}
 */
export function isValidName(name) {
  return name.trim().length >= 2 && name.trim().length <= 50;
}

/**
 * Validate phone number (basic validation)
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

/**
 * Validate required field
 * @param {string} value
 * @returns {boolean}
 */
export function isRequired(value) {
  return value && value.trim().length > 0;
}

/**
 * Validate form data
 * @param {object} formData
 * @param {object} validationRules
 * @returns {object} {isValid: boolean, errors: object}
 */
export function validateForm(formData, validationRules) {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(field => {
    const rules = validationRules[field];
    const value = formData[field];

    if (rules.required && !isRequired(value)) {
      errors[field] = `${field} is required`;
      isValid = false;
    } else if (value && rules.validator) {
      const result = rules.validator(value);
      if (typeof result === "boolean" && !result) {
        errors[field] = rules.message || `${field} is invalid`;
        isValid = false;
      } else if (typeof result === "object" && !result.isValid) {
        errors[field] = result.errors.join(", ");
        isValid = false;
      }
    }
  });

  return { isValid, errors };
}

/**
 * Example validation rules for login form
 */
export const loginValidationRules = {
  email: {
    required: true,
    validator: isValidEmail,
    message: "Please enter a valid email address",
  },
  password: {
    required: true,
  },
};

/**
 * Example validation rules for registration form
 */
export const registerValidationRules = {
  name: {
    required: true,
    validator: isValidName,
    message: "Name must be between 2 and 50 characters",
  },
  email: {
    required: true,
    validator: isValidEmail,
    message: "Please enter a valid email address",
  },
  password: {
    required: true,
    validator: validatePassword,
  },
};
