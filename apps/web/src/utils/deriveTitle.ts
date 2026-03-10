export function deriveTitle(content: string): string {
  const firstLine = content.split('\n')[0].trim();
  return firstLine || 'Untitled';
}
