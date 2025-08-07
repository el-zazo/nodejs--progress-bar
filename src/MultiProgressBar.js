/**
 * @fileoverview MultiProgressBar class for managing multiple progress bars
 * @module MultiProgressBar
 */

// Dependencies
const { MultiBar } = require("cli-progress");

// Constants
const { DEFAULT_CONFIG } = require("./constants/barConfig");

// Utilities
const { formatProgressBar } = require("./utils/formatters");

/**
 * MultiProgressBar class for creating and managing multiple CLI progress bars
 * @class
 */
class MultiProgressBar {
  /**
   * @private
   * @type {MultiBar}
   * The underlying multi-bar instance
   */
  #multiBar;

  /**
   * @private
   * @type {Map<number, any>}
   * Map of bar IDs to bar instances
   */
  #bars = new Map();

  /**
   * Creates a new MultiProgressBar instance
   * @param {Object} [config] - Custom configuration options
   * @param {string} [config.color="cyan"] - Default color of the progress bars
   * @param {string} [config.format] - Custom format string
   * @param {string} [config.barCompleteChar="\u2588"] - Character for completed part of the bar
   * @param {string} [config.barIncompleteChar="\u2591"] - Character for incomplete part of the bar
   * @param {boolean} [config.hideCursor=true] - Whether to hide cursor during progress
   * @param {boolean} [config.clearOnComplete=false] - Whether to clear the bar on complete
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

      // Create the multi-bar instance
      this.#multiBar = new MultiBar(barConfig);
    } catch (error) {
      throw new Error(`Failed to initialize multi progress bar: ${error.message}`);
    }
  }

  /**
   * Creates a new progress bar and adds it to the multi-bar
   * @param {number} [total=10] - Total number of steps
   * @param {number} [barId=null] - Identifier for the bar (if null, auto-generated)
   * @param {Object} [barConfig={}] - Configuration for this specific bar
   * @returns {number} The ID of the created bar
   * @throws {Error} If the progress bar creation fails
   */
  createBar(total = 10, barId = null, barConfig = {}) {
    try {
      if (typeof total !== "number" || total <= 0) {
        throw new Error("Total must be a positive number");
      }

      // Generate a bar ID if not provided
      const id = barId !== null ? barId : this.#bars.size + 1;

      // Create the bar with the specified ID
      const bar = this.#multiBar.create(total, 0, { i: id, ...barConfig });

      // Store the bar in the map
      this.#bars.set(id, bar);

      return id;
    } catch (error) {
      throw new Error(`Failed to create progress bar: ${error.message}`);
    }
  }

  /**
   * Updates a specific progress bar with a new value
   * @param {number} barId - ID of the bar to update
   * @param {number} newValue - Current progress value
   * @param {Object} [payload={}] - Additional payload to update
   * @throws {Error} If the progress bar update fails
   */
  updateBar(barId, newValue, payload = {}) {
    try {
      if (!this.#bars.has(barId)) {
        throw new Error(`Bar with ID ${barId} does not exist`);
      }

      if (typeof newValue !== "number") {
        throw new Error("New value must be a number");
      }

      const bar = this.#bars.get(barId);

      // Check if new value exceeds total and complete the bar if it does
      if (bar.getTotal() <= newValue) {
        bar.update(bar.getTotal(), payload);
        bar.stop();
        return;
      }

      bar.update(newValue, payload);
    } catch (error) {
      throw new Error(`Failed to update progress bar: ${error.message}`);
    }
  }

  /**
   * Increments a specific progress bar by the specified amount
   * @param {number} barId - ID of the bar to increment
   * @param {number} [incrementBy=1] - Amount to increment
   * @param {Object} [payload={}] - Additional payload to update
   * @throws {Error} If the progress bar increment fails
   */
  incrementBar(barId, incrementBy = 1, payload = {}) {
    try {
      if (!this.#bars.has(barId)) {
        throw new Error(`Bar with ID ${barId} does not exist`);
      }

      if (typeof incrementBy !== "number") {
        throw new Error("Increment value must be a number");
      }

      const bar = this.#bars.get(barId);

      // Check if new value after increment exceeds total
      const currentValue = bar.getProgress();
      const newValue = currentValue + incrementBy;

      if (bar.getTotal() <= newValue) {
        bar.update(bar.getTotal(), payload);
        bar.stop();
        return;
      }

      bar.increment(incrementBy, payload);
    } catch (error) {
      throw new Error(`Failed to increment progress bar: ${error.message}`);
    }
  }

  /**
   * Removes a specific bar from the multi-bar
   * @param {number} barId - ID of the bar to remove
   * @throws {Error} If the progress bar removal fails
   */
  removeBar(barId) {
    try {
      if (!this.#bars.has(barId)) {
        throw new Error(`Bar with ID ${barId} does not exist`);
      }

      const bar = this.#bars.get(barId);
      this.#multiBar.remove(bar);
      this.#bars.delete(barId);
    } catch (error) {
      throw new Error(`Failed to remove progress bar: ${error.message}`);
    }
  }

  /**
   * Stops all progress bars and cleans up resources
   * @throws {Error} If the multi-bar stop fails
   */
  stop() {
    try {
      // Convert Map to array and check if any bars are still active
      const bars = Array.from(this.#bars.values());
      const hasActiveBar = bars.some((bar) => bar.isActive);

      // Stop all bars if any are still active
      if (!hasActiveBar) {
        this.#multiBar.stop();
        this.#bars.clear();
        return true;
      }

      return false;
    } catch (error) {
      throw new Error(`Failed to stop multi progress bar: ${error.message}`);
    }
  }
}

module.exports = MultiProgressBar;
