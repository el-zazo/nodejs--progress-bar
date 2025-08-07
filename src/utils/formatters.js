/**
 * @fileoverview Utility functions for formatting progress bar output
 * @module utils/formatters
 */

const { set } = require("ansi-color");

/**
 * Applies color to a string using ansi-color
 * @param {string} text - The text to colorize
 * @param {string} color - The color to apply
 * @returns {string} The colorized text
 */
const colorize = (text, color) => {
  try {
    return set(text, color);
  } catch (error) {
    console.error(`Error applying color: ${error.message}`);
    return text; // Return original text if coloring fails
  }
};

/**
 * Creates a formatted progress bar string
 * @param {Object} options - Formatting options
 * @param {string} options.barChar - Character for the bar
 * @param {string} options.color - Color for the bar
 * @param {string} options.prefix - Text to display before the bar
 * @param {string} options.suffix - Text to display after the bar
 * @returns {string} The formatted progress bar string
 */
const formatProgressBar = ({ barChar = "{bar}", color = "cyan", prefix = "{i} | ", suffix = " | {percentage}% | {value}/{total}" } = {}) => {
  try {
    const coloredBar = colorize(barChar, color);
    return `${prefix}${coloredBar}${suffix}`;
  } catch (error) {
    console.error(`Error formatting progress bar: ${error.message}`);
    return "{i} | {bar} | {percentage}% | {value}/{total}"; // Return default format if formatting fails
  }
};

module.exports = {
  colorize,
  formatProgressBar,
};
