/**
 * @fileoverview Constants for progress bar configuration
 * @module constants/barConfig
 */

/**
 * Default characters for progress bar visualization
 * @constant {Object} BAR_CHARACTERS
 */
const BAR_CHARACTERS = {
  /** Character for completed portion of the bar */
  COMPLETE: "\u2588",
  /** Character for incomplete portion of the bar */
  INCOMPLETE: "\u2591",
};

/**
 * Default colors for progress bar
 * @constant {Object} BAR_COLORS
 */
const BAR_COLORS = {
  /** Default color for progress bar */
  DEFAULT: "cyan",
  /** Color for success state */
  SUCCESS: "green",
  /** Color for warning state */
  WARNING: "yellow",
  /** Color for error state */
  ERROR: "red",
};

/**
 * Default configuration for progress bar
 * @constant {Object} DEFAULT_CONFIG
 */
const DEFAULT_CONFIG = {
  /** Default format string for progress bar */
  format: "{i} | {bar} | {percentage}% | {value}/{total}",
  /** Character for completed portion of the bar */
  barCompleteChar: BAR_CHARACTERS.COMPLETE,
  /** Character for incomplete portion of the bar */
  barIncompleteChar: BAR_CHARACTERS.INCOMPLETE,
  /** Whether to hide cursor during progress */
  hideCursor: true,
  /** Default color for the bar */
  color: BAR_COLORS.DEFAULT,
};

module.exports = {
  BAR_CHARACTERS,
  BAR_COLORS,
  DEFAULT_CONFIG,
};
