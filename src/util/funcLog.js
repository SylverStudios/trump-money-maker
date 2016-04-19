function funcLog() {
  const callingFuncName = new Error().stack.split('\n')[2].trim().split(' ')[1];
  let logArgs = ['[' + callingFuncName + ']'];
  logArgs = logArgs.concat(Array.prototype.slice.call(arguments));
  console.log.apply(console, logArgs);
}

export default funcLog;
