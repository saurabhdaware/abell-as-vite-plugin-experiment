import { render } from './renderer';
const fileRegex = /\.abell$/

export function abellVitePlugin() {
  return {
    name: 'transform-file',

    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: render(src),
          map: null // provide source map if available
        }
      }
    }
  }
}