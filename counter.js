function counter(seconds, msg, callback) {
  console.log('NODE_ENV', process.NODE_ENV);
  let counter = seconds;
  const interval = setInterval(() => {
    if(process.NODE_ENV === "production"){
      console.log('Starting counter!');
    } else {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`${msg} ${counter.toString()}`);
    }
    counter--;
    if (counter < 0) {
      clearInterval(interval);
      if(process.NODE_ENV === "production"){
        console.log('Starting callback');
      } else {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
      }
      callback();
    }
  }, 1000);
}

module.exports = counter;
