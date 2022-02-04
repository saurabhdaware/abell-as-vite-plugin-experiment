import tokenize from "./tokenizer";

/**
 * 
 * Tiny piece of rendering logic from abell-renderer
 * 
 * @param {string} abellTemplate 
 * @returns 
 */
export function render(abellTemplate) {
  const tokenSchema = {
    COMMENTED_OUT_BLOCK_START: /\\{{/,
    BLOCK_START: /{{/,
    BLOCK_END: /}}/,
  };
  const tokens = tokenize(abellTemplate, tokenSchema, "default");
  
  let isInsideAbellBlock = false;
  let htmlString = '';
  let jsString = '';
  for (const token of tokens) {
    if (token.type === "BLOCK_START") {
      isInsideAbellBlock = true;
    } else if (token.type === "BLOCK_END") {
      isInsideAbellBlock = false;
      htmlString += `\${${jsString}}`;
      jsString = '';
    } else {
      // normal string;
      if (isInsideAbellBlock) {
        jsString += token.text;
      } else {
        htmlString += token.text;
      }
    }
  }
  
  const out = `
  const html = \`${htmlString.trim()}\`;
  export default html;
  `;

  return out;
}