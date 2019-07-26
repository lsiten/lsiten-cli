import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import symbols from 'log-symbols'

export const  writeFile = (p, text) => {
  fs.writeFile(p, text, function (err) {
    if (!err) {
      console.log(symbols.success, chalk.green('写入成功！'));
    }
  })
}

//递归创建目录 同步方法  
export const mkdirsSync = dirname => {  
  if (fs.existsSync(dirname)) {  
    return true;
  } else {  
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }  
  }  
}

export const _copy = (src, dist) => {
  let paths = fs.readdirSync(src)
  paths.forEach(function (p) {
    let _src = src + '/' + p;
    let _dist = dist + '/' + p;
    var stat = fs.statSync(_src)
    if(stat.isFile()) {// 判断是文件还是目录
      fs.writeFileSync(_dist, fs.readFileSync(_src));
    } else if(stat.isDirectory()) {
      copyDir(_src, _dist);// 当是目录是，递归复制
    }
  })
}

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
export const copyDir = (src, dist) => {
  let b = fs.existsSync(dist);
  if (!b) {
    mkdirsSync(dist); // 创建目录
  }
  _copy(src, dist);
}

export const createDocs = (src, dist, callback) => {
  copyDir(src, dist);
  if (callback) {
    callback();
  }
}
