# Progress Bar

A flexible and robust Node.js progress bar library for command-line interfaces.

## Features

- Single progress bar support
- Multiple progress bars support
- Customizable colors and characters
- Error handling
- Easy to use API

## Installation

```bash
npm install @el-zazo/progress-bar
```

## Usage

### Single Progress Bar

```js
const { ProgressBar } = require("@el-zazo/progress-bar");

// Create a new progress bar
const progressBar = new ProgressBar();

// Start the progress bar with a total of 10 steps
progressBar.start(10);

// Update the progress bar every second
let current = 0;
const interval = setInterval(() => {
  // Update the progress bar
  progressBar.update(++current);

  // Stop when complete
  if (current === 10) {
    clearInterval(interval);
    progressBar.stop();
  }
}, 1000);
```

Output:

```
1 | ████████████████████████░░░░░░░░░░░░░░░░ | 60% | 6/10
```

### Multiple Progress Bars

```js
const { MultiProgressBar, BAR_COLORS } = require("@el-zazo/progress-bar");

// Create a new multi-progress bar
const multiBar = new MultiProgressBar();

// Create two progress bars with different totals
const bar1Id = multiBar.createBar(10, 1);
const bar2Id = multiBar.createBar(20, 2, { color: BAR_COLORS.SUCCESS });

// Update the progress bars at different rates
let count1 = 0;
let count2 = 0;

const interval1 = setInterval(() => {
  multiBar.updateBar(bar1Id, ++count1);
  if (count1 === 10) {
    clearInterval(interval1);
  }
}, 1000);

const interval2 = setInterval(() => {
  multiBar.updateBar(bar2Id, ++count2);
  if (count2 === 20) {
    clearInterval(interval2);
    multiBar.stop();
  }
}, 500);
```

## API Reference

### ProgressBar

#### Constructor

```js
const progressBar = new ProgressBar(config);
```

- `config` (optional): Configuration object
  - `color`: Bar color (default: 'cyan')
  - `format`: Custom format string
  - `barCompleteChar`: Character for completed part
  - `barIncompleteChar`: Character for incomplete part
  - `hideCursor`: Whether to hide cursor

#### Methods

- `start(total, barNumber)`: Start the progress bar

  - `total`: Total number of steps (default: 10)
  - `barNumber`: Identifier for the bar (default: 1)

- `update(newValue)`: Update the progress bar

  - `newValue`: Current progress value

- `increment(incrementBy)`: Increment the progress bar

  - `incrementBy`: Amount to increment (default: 1)

- `stop()`: Stop the progress bar

### MultiProgressBar

#### Constructor

```js
const multiBar = new MultiProgressBar(config);
```

- `config` (optional): Configuration object (same as ProgressBar)

#### Methods

- `createBar(total, barId, barConfig)`: Create a new progress bar

  - `total`: Total number of steps (default: 10)
  - `barId`: Identifier for the bar (default: auto-generated)
  - `barConfig`: Configuration for this specific bar
  - Returns: The ID of the created bar

- `updateBar(barId, newValue, payload)`: Update a specific bar

  - `barId`: ID of the bar to update
  - `newValue`: Current progress value
  - `payload`: Additional payload to update

- `incrementBar(barId, incrementBy, payload)`: Increment a specific bar

  - `barId`: ID of the bar to increment
  - `incrementBy`: Amount to increment (default: 1)
  - `payload`: Additional payload to update

- `removeBar(barId)`: Remove a specific bar

  - `barId`: ID of the bar to remove

- `stop()`: Stop all progress bars

### Constants

- `BAR_COLORS`: Available colors

  - `DEFAULT`: 'cyan'
  - `SUCCESS`: 'green'
  - `WARNING`: 'yellow'
  - `ERROR`: 'red'

- `BAR_CHARACTERS`: Available characters
  - `COMPLETE`: '█' (Unicode block)
  - `INCOMPLETE`: '░' (Unicode light shade)

## License

ISC
