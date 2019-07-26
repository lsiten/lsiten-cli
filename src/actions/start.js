import { promisify } from 'util';
import fs from 'fs';
import {exec} from 'child_process';
import chalk from 'chalk';
import symbol from 'log-symbols';

const exits = promisify(fs.exists);
const readFile = promisify(fs.readFile);

let action = async (...args) => {
  const fileName = './package.json';
  const startFile = './.lib/start.js';
  const exit = await exits(startFile);
  if (exit) {
    exec(`node ${startFile}`, (err, stdout, stderr) => {
      if (err) {
        console.log(symbol.error, chalk.red('执行错误...'))
        return false
      }
      console.log(symbol.success, chalk.green(`开始执行:\n ${stdout}`));
      console.log(symbol.success, chalk.green(`执行完毕....`));
    })
    return true;
  }
  const exitpkg = await exits(fileName);
  if (exitpkg) {
    let pkgs = await readFile(fileName, 'utf8');
    pkgs = JSON.parse(pkgs);
    pkgs.scripts.start && (
      exec(pkgs.scripts.start, (err, stdout, stderr) => {
        if (err) {
          console.log(symbol.error, chalk.red('执行错误...'))
          return false
        }
        console.log(symbol.success, chalk.green(`stdout: ${stdout}`));
        console.log(symbol.success, chalk.green(`执行完毕....`));
      })
    )
    return true
  }
  console.log('测试逻辑')
  return true
}

module.exports = action;
