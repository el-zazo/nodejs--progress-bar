/**
 * @fileoverview Main entry point for the progress bar library
 * @module progress-bar
 */

// Components
const ProgressBar = require("./ProgressBar");
const MultiProgressBar = require("./MultiProgressBar");

// Constants
const { BAR_COLORS, BAR_CHARACTERS } = require("./constants/barConfig");

/**
 * @typedef {Object} ProgressBarExports
 * @property {typeof ProgressBar} ProgressBar - Single progress bar class
 * @property {typeof MultiProgressBar} MultiProgressBar - Multiple progress bars manager
 * @property {Object} BAR_COLORS - Available colors for progress bars
 * @property {Object} BAR_CHARACTERS - Available characters for progress bars
 */

/**
 * Library exports
 * @type {ProgressBarExports}
 */
module.exports = {
  ProgressBar,
  MultiProgressBar,
  BAR_COLORS,
  BAR_CHARACTERS,
};
