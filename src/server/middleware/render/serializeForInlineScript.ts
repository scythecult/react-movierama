const INLINE_SCRIPT_ESCAPES: Record<string, string> = {
  '&': '\\u0026',
  '<': '\\u003c',
  '>': '\\u003e',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
};

// JSON.stringify leaves `<` intact, so a value like `</script>` would close the inline script.
export const serializeForInlineScript = (value: unknown) =>
  JSON.stringify(value).replace(/[&<>\u2028\u2029]/g, (character) => INLINE_SCRIPT_ESCAPES[character]);
