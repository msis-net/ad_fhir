function convertPathToHtml(path) {
  let count = 0
  let htmlPath = ''

  //文字列が引数で指定された文字列で始まるかを判定
  while (path.startsWith('../')) {
    count++
    path = path.slice(3)
  }
  console.log(path)
  if (count === 2) {
    htmlPath = '.'
  }

  if (count === 3) {
    htmlPath = '..'
  }

  if (count === 4) {
    htmlPath = '../..'
  }

  if (count === 5) {
    htmlPath = '../../..'
  }

  return htmlPath
}

export { convertPathToHtml }
