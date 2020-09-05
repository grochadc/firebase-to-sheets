function counter(seconds, msg, callback) {
  const enviroment =  process.env.NODE_ENV;
  let counter = seconds;
  const interval = setInterval(() => {
    if(enviroment === "production"){
      console.log('Starting counter!');
    } else {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`${msg} ${counter.toString()}`);
    }
    counter--;
    if (counter < 0) {
      clearInterval(interval);
      if(enviroment ===  "production"){
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
