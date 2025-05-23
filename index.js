const { set } = require("ansi-color");
const { SingleBar } = require("cli-progress");

/**
 * ## Create Progress Bar
 */
class ProgressBar {
  #Bar;

  constructor() {
    // Configuration
    const bar = set("{bar}", "cyan");
    const format = `{i} | ${bar} | {percentage}% | {value}/{total}`;
    const config = { format, barCompleteChar: "\u2588", barIncompleteChar: "\u2591", hideCursor: true };

    // Creation
    this.#Bar = new SingleBar(config);
  }

  /**
   * ### Start Progress Bar
   */
  start(total = 10, bar_number = 1) {
    this.#Bar.start(total, 0, { i: bar_number });
  }

  /**
   * ### Update Progress Bar
   */
  update(new_value = 0) {
    this.#Bar.update(new_value);
  }

  /**
   * ### Stop Progress Bar
   */
  stop() {
    this.#Bar.stop();
  }
}

module.exports = { ProgressBar };
