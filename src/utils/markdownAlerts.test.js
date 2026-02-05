/**
 * Tests for GitHub-style alerts markdown extension
 */

import { marked } from 'marked';
import { configureMarked } from './markdownAlerts';

describe('GitHub Alerts Extension', () => {
  beforeEach(() => {
    configureMarked(marked);
  });

  test('renders NOTE alert', () => {
    const markdown = `> [!NOTE]
> This is a note`;

    const html = marked(markdown);
    expect(html).toContain('message is-info github-alert');
    expect(html).toContain('Note');
    expect(html).toContain('This is a note');
  });

  test('renders WARNING alert', () => {
    const markdown = `> [!WARNING]
> This is a warning`;

    const html = marked(markdown);
    expect(html).toContain('message is-warning github-alert');
    expect(html).toContain('Warning');
    expect(html).toContain('This is a warning');
  });

  test('renders TIP alert', () => {
    const markdown = `> [!TIP]
> Helpful advice here`;

    const html = marked(markdown);
    expect(html).toContain('message is-success github-alert');
    expect(html).toContain('Tip');
    expect(html).toContain('Helpful advice here');
  });

  test('renders IMPORTANT alert', () => {
    const markdown = `> [!IMPORTANT]
> Key information`;

    const html = marked(markdown);
    expect(html).toContain('message is-link github-alert');
    expect(html).toContain('Important');
    expect(html).toContain('Key information');
  });

  test('renders CAUTION alert', () => {
    const markdown = `> [!CAUTION]
> Be careful with this`;

    const html = marked(markdown);
    expect(html).toContain('message is-danger github-alert');
    expect(html).toContain('Caution');
    expect(html).toContain('Be careful with this');
  });

  test('handles multi-line alert content', () => {
    const markdown = `> [!NOTE]
> Line 1
> Line 2
> Line 3`;

    const html = marked(markdown);
    expect(html).toContain('Line 1');
    expect(html).toContain('Line 2');
    expect(html).toContain('Line 3');
  });

  test('handles alert with inline markdown', () => {
    const markdown = `> [!WARNING]
> This is **bold** and *italic*`;

    const html = marked(markdown);
    expect(html).toContain('<strong>bold</strong>');
    expect(html).toContain('<em>italic</em>');
  });

  test('ignores invalid alert types', () => {
    const markdown = `> [!INVALID]
> This should not render as alert`;

    const html = marked(markdown);
    // Should fall back to regular blockquote
    expect(html).toContain('blockquote');
  });

  test('handles case-insensitive alert types', () => {
    const markdown = `> [!note]
> Lowercase note`;

    const html = marked(markdown);
    expect(html).toContain('message is-info github-alert');
  });

  test('handles multiple consecutive alerts without mixing content', () => {
    const markdown = `Some intro text.

> [!WARNING]
> This is a warning alert.
> With multiple lines.

> [!NOTE]
> This is a note alert.
> Also with multiple lines.

> [!TIP]
> This is a tip alert.`;

    const html = marked(markdown);

    // Should have 3 separate article elements
    const articleCount = (html.match(/<article class="message/g) || []).length;
    expect(articleCount).toBe(3);

    // Each alert type should appear once
    expect(html).toContain('message is-warning github-alert');
    expect(html).toContain('message is-info github-alert');
    expect(html).toContain('message is-success github-alert');

    // Content should not leak between alerts
    expect(html).toContain('This is a warning alert');
    expect(html).toContain('This is a note alert');
    expect(html).toContain('This is a tip alert');

    // The literal tags should NOT appear in output
    expect(html).not.toContain('[!NOTE]');
    expect(html).not.toContain('[!TIP]');
  });

  test('handles code blocks inside alerts', () => {
    const markdown = `> [!TIP]
> Example formula:
> \`\`\`
> max = work_mem × operations
> \`\`\``;

    const html = marked(markdown);

    expect(html).toContain('message is-success github-alert');
    expect(html).toContain('<code>');
    expect(html).toContain('max = work_mem');
  });

  test('handles tables inside alerts', () => {
    const markdown = `> [!TIP]
> Connection recommendations:
>
> | Scenario | Connections |
> |----------|------------|
> | With pooling | 20-50 |
> | Without pooling | 100-200 |`;

    const html = marked(markdown);

    expect(html).toContain('message is-success github-alert');
    expect(html).toContain('<table>');
    expect(html).toContain('<th>');
    expect(html).toContain('Scenario');
    expect(html).toContain('With pooling');
    expect(html).toContain('20-50');
  });

  test('handles lists with links inside alerts', () => {
    const markdown = `> [!TIP]
> Use connection pooling:
> - [PgBouncer](https://pgbouncer.org/) - Lightweight
> - [PgCat](https://github.com/postgresml/pgcat) - Rust-based`;

    const html = marked(markdown);

    expect(html).toContain('message is-success github-alert');
    expect(html).toContain('<a href="https://pgbouncer.org/">PgBouncer</a>');
    expect(html).toContain('<a href="https://github.com/postgresml/pgcat">PgCat</a>');
    expect(html).toContain('Lightweight');
    expect(html).toContain('Rust-based');
  });

  test('handles complex alert with multiple block elements', () => {
    const markdown = `> [!WARNING]
> High memory usage warning:
>
> Formula:
> \`\`\`
> max = work_mem × operations
> \`\`\`
>
> | Type | Memory |
> |------|--------|
> | Low | 4MB |
> | High | 128MB |
>
> See [docs](https://example.com) for details.`;

    const html = marked(markdown);

    expect(html).toContain('message is-warning github-alert');
    expect(html).toContain('<code>');
    expect(html).toContain('<table>');
    expect(html).toContain('<a href="https://example.com">docs</a>');
    expect(html).toContain('work_mem');
    expect(html).toContain('128MB');
  });
});
