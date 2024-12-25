export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const truncateDescription = (
  description: string,
  maxLength: number = 50
) => {
  if (description.length <= maxLength) return description;

  return description.slice(0, maxLength) + "...";
};
