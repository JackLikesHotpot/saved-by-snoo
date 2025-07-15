import React from 'react';

export function textWithLink(input: string): JSX.Element {
  // Match any text followed by (URL) at the end
  const match = input.match(/^(.*)\s+\((https?:\/\/[^\s)]+)\)$/);

  if (!match) return <span>{input}</span>; // Fallback: show raw text

  const [, text, url] = match;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
}
