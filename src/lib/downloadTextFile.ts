/** Triggers a browser download of `contents` as a file named `fileName`. */
export function downloadTextFile(fileName: string, contents: string): void {
  const blob = new Blob([contents], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

/** Converts a phrase into a filesystem-safe, lowercase, hyphenated slug. */
export function slugify(value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return slug.length > 0 ? slug : 'design';
}
