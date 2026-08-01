export function posterUrl(filename?: string | null): string {
  if (!filename) {
    return "https://via.placeholder.com/300x450?text=No+Poster";
  }
  if (filename.startsWith("http")) {
    return filename;
  }
  return `/uploads/${filename}`;
}

export function escapeHtml(text?: string | null): string {
  if (!text) return "";
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export function formatDate(date: Date | null | undefined): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
