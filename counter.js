function counter(seconds, msg, callback) {
  let counter = seconds;
  const interval = setInterval(() => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`${msg} ${counter.toString()}`);
    counter--;
    if (counter < 0) {
      clearInterval(interval);
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      callback();
    }
  }, 1000);
}

module.exports = counter;
