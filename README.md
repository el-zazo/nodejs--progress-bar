# Progress Bar

Example evry 1 second update progress bar from 0 to 10

code:

```js
const PB = new ProgressBar();
let [total, current] = [10, 0];

PB.start(total);

const int_test = setInterval(() => {
  PB.update(++current);

  if (current === total) {
    clearInterval(int_test);
    PB.stop();
  }
}, 1000);
```

result:

```txt
1 | ████████████████████████░░░░░░░░░░░░░░░░ | 60% | 6/10
```
