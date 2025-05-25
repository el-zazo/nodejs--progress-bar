/**
 * @fileoverview Demo examples for the progress bar library
 */

// Import the library components
const { ProgressBar, MultiProgressBar, BAR_COLORS } = require("../");

/**
 * Demonstrates a single progress bar
 */
function singleBarDemo() {
  console.log("\n=== Single Progress Bar Demo ===\n");

  // Create a new progress bar
  const progressBar = new ProgressBar();

  // Start the progress bar with a total of 10 steps
  progressBar.start(10);

  // Update the progress bar every 500ms
  let current = 0;
  const interval = setInterval(() => {
    try {
      // Update the progress bar
      current += 2;
      progressBar.update(current);

      // Stop when complete
      if (current === 10) {
        clearInterval(interval);
        progressBar.stop();
        console.log("\nSingle bar demo completed!\n");

        // Run the multi-bar demo after a short delay
        setTimeout(multiBarDemo, 1000);
      }
    } catch (error) {
      console.error(`Error in single bar demo: ${error.message}`);
      clearInterval(interval);
    }
  }, 500);
}

/**
 * Demonstrates multiple progress bars
 */
function multiBarDemo() {
  console.log("\n=== Multiple Progress Bars Demo ===\n");

  function displayMessage() {
    console.log("\nMulti-bar demo completed!\n");
    console.log("All demos finished. Press Ctrl+C to exit.");
  }

  try {
    // Create a new multi-progress bar
    const multiBar = new MultiProgressBar();

    // Create three progress bars with different configurations
    const bar1Id = multiBar.createBar(10, 1);
    const bar2Id = multiBar.createBar(15, 2, { color: BAR_COLORS.SUCCESS });
    const bar3Id = multiBar.createBar(5, 3, { color: BAR_COLORS.WARNING });

    // Update the progress bars at different rates
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;

    // First bar - updates every 800ms
    const interval1 = setInterval(() => {
      try {
        multiBar.updateBar(bar1Id, ++count1);
        if (count1 === 10) {
          clearInterval(interval1);

          if (multiBar.stop()) {
            displayMessage();
          }
        }
      } catch (error) {
        console.error(`Error updating bar 1: ${error.message}`);
        clearInterval(interval1);
      }
    }, 800);

    // Second bar - updates every 500ms
    const interval2 = setInterval(() => {
      try {
        multiBar.updateBar(bar2Id, ++count2);
        if (count2 === 15) {
          clearInterval(interval2);

          if (multiBar.stop()) {
            displayMessage();
          }
        }
      } catch (error) {
        console.error(`Error updating bar 2: ${error.message}`);
        clearInterval(interval2);
      }
    }, 500);

    // Third bar - updates every 1000ms
    const interval3 = setInterval(() => {
      try {
        multiBar.updateBar(bar3Id, ++count3);

        if (count3 === 5) {
          clearInterval(interval3);

          if (multiBar.stop()) {
            displayMessage();
          }
        }
      } catch (error) {
        console.error(`Error updating bar 3: ${error.message}`);
        clearInterval(interval3);
      }
    }, 1000);
  } catch (error) {
    console.error(`Error in multi-bar demo: ${error.message}`);
  }
}

// Start the demo
console.log("Progress Bar Library Demo");
console.log("========================\n");

// Run the single bar demo first
singleBarDemo();
