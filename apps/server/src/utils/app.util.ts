export const slugify = (text: string): string => {
  return text
      .toLowerCase()
      .normalize("NFD") // Normalize to decomposed form for handling accents
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^\w\s-]/g, "") // Remove non-word chars (except hyphens)
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-"); // Remove consecutive hyphens
}