import chalk from 'chalk';

let action = (...args) => {
  console.log(args)
  chalk.green('init' + JSON.stringify(args))
}

export default action
