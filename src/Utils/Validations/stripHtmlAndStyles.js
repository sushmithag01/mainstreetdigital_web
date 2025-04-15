export function stripHtmlAndStyles(html) {
  let stripped = html.replace(/style="[^"]*"/g, "");

  stripped = stripped.replace(/<[^>]*>/g, "");

  const entities = {
    " ": " ",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
  };

  stripped = stripped.replace(/&[^;]+;/g, (entity) => {
    return entities[entity] || entity;
  });

  return stripped.replace(/\s+/g, " ").trim();
}
