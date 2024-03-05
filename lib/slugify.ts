export const slugify = (str: string): string => {
  return str.split(" ").join("-").toLowerCase();
};
