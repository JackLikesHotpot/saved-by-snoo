export function markdownToReadable(text: string): string {
  if (!text) return '';

  // 1. Replace bold (**text** or __text__) and italic (*text* or _text_) by just the text
  text = text.replace(/(\*\*|__)(.*?)\1/g, '$2'); // bold
  text = text.replace(/(\*|_)(.*?)\1/g, '$2');    // italic

  // 2. Replace blockquotes (> text) with just the text prefixed by >
  text = text.replace(/^> ?(.*)$/gm, '> $1');

  // 3. Replace unordered list markers (-, *, +) with bullets (•)
  text = text.replace(/^\s*[-*+]\s+/gm, '• ');

  // 4. Replace links [text](url) with "text (url)"
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)');

  // 5. Remove inline code backticks (`code`)
  text = text.replace(/`([^`]+)`/g, '$1');

  // 6. Replace multiple newlines with two newlines for paragraph spacing
  text = text.replace(/\n{3,}/g, '\n\n');

  // 7. Trim trailing spaces on lines
  text = text.replace(/[ \t]+$/gm, '');

  return text;
}