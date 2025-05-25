/**
 * @fileoverview ProgressBar class implementation for CLI progress visualization
 * @module ProgressBar
 */

// Dependencies
const { SingleBar } = require("cli-progress");

// Constants
const { DEFAULT_CONFIG } = require("./constants/barConfig");

// Utilities
const { formatProgressBar } = require("./utils/formatters");

/**
 * ProgressBar class for creating and managing CLI progress bars
 * @class
 */
class ProgressBar {
  /**
   * @private
   * @type {SingleBar}
   * The underlying progress bar instance
   */
  #bar;

  /**
   * Creates a new ProgressBar instance
   * @param {Object} [config] - Custom configuration options
   * @param {string} [config.color="cyan"] - Color of the progress bar
   * @param {string} [config.format] - Custom format string
   * @param {string} [config.barCompleteChar="\u2588"] - Character for completed part of the bar
   * @param {string} [config.barIncompleteChar="\u2591"] - Character for incomplete part of the bar
   * @param {boolean} [config.hideCursor=true] - Whether to hide cursor during progress
   */
  constructor(config = {}) {
    try {
      // Merge default config with user-provided config
      const mergedConfig = { ...DEFAULT_CONFIG, ...config };

      // Extract color from merged config
      const { color, ...barConfig } = mergedConfig;

      // Set the bar format with the specified color
      barConfig.format = formatProgressBar({
        barChar: "{bar}",
        color,
        prefix: "{i} | ",
        suffix: " | {percentage}% | {value}/{total}",
      });

      // Create the progress bar instance
      this.#bar = new SingleBar(barConfig);
    } catch (error) {
      throw new Error(`Failed to initialize progress bar: ${error.message}`);
    }
  }

  /**
   * Starts the progress bar
   * @param {number} [total=10] - Total number of steps
   * @param {number} [barNumber=1] - Identifier for the bar (useful when using multiple bars)
   * @throws {Error} If the progress bar fails to start
   */
  start(total = 10, barNumber = 1) {
    try {
      if (typeof total !== "number" || total <= 0) {
        throw new Error("Total must be a positive number");
      }
      this.#bar.start(total, 0, { i: barNumber });
    } catch (error) {
      throw new Error(`Failed to start progress bar: ${error.message}`);
    }
  }

  /**
   * Updates the progress bar with a new value
   * @param {number} [newValue=0] - Current progress value
   * @throws {Error} If the progress bar update fails
   */
  update(newValue = 0) {
    try {
      if (this.#bar.isActive) {
        if (typeof newValue !== "number") {
          throw new Error("New value must be a number");
        }

        if (this.#bar.getTotal() <= newValue) {
          this.#bar.update(this.#bar.getTotal());
          this.#bar.stop();
          return;
        }

        this.#bar.update(newValue);
      }
    } catch (error) {
      throw new Error(`Failed to update progress bar: ${error.message}`);
    }
  }

  /**
   * Increments the progress bar by the specified amount
   * @param {number} [incrementBy=1] - Amount to increment
   * @throws {Error} If the progress bar increment fails
   */
  increment(incrementBy = 1) {
    try {
      if (this.#bar.isActive) {
        if (typeof incrementBy !== "number") {
          throw new Error("Increment value must be a number");
        }

        if (this.#bar.getTotal() <= this.#bar.getProgress() + incrementBy) {
          this.#bar.update(this.#bar.getTotal());
          this.#bar.stop();
          return;
        }

        this.#bar.increment(incrementBy);
      }
    } catch (error) {
      throw new Error(`Failed to increment progress bar: ${error.message}`);
    }
  }

  /**
   * Stops the progress bar
   * @throws {Error} If the progress bar fails to stop
   */
  stop() {
    try {
      this.#bar.stop();
      return true;
    } catch (error) {
      throw new Error(`Failed to stop progress bar: ${error.message}`);
    }
  }
}

module.exports = ProgressBar;
