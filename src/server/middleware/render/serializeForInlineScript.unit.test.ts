import { serializeForInlineScript } from './serializeForInlineScript';

describe('serializeForInlineScript', () => {
  test('should escape characters that can break out of an inline script', () => {
    const serialized = serializeForInlineScript({
      title: '</script><script>alert(1)</script>',
      note: 'a & b',
      line: 'line\u2028sep\u2029',
    });

    expect(serialized).not.toContain('<');
    expect(serialized).not.toContain('>');
    expect(serialized).not.toContain('&');
    expect(serialized).toContain('\\u003c/script\\u003e');
    expect(serialized).toContain('\\u0026');
    expect(serialized).toContain('\\u2028');
    expect(serialized).toContain('\\u2029');
    expect(JSON.parse(serialized).title).toBe('</script><script>alert(1)</script>');
  });

  test('should leave only the template closing tag when the payload tries to end the script', () => {
    const payload = serializeForInlineScript({ html: '</ScRiPt><script>alert(1)</script>' });
    const document = `<script>window.__state=${payload}</script>`;
    const closings = document.match(/<\/script/gi);

    expect(closings).toEqual(['</script']);
    expect(JSON.parse(payload).html).toBe('</ScRiPt><script>alert(1)</script>');
  });
});
