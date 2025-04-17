export const formatDate = (date: Date | null) => {
  if (!date) return "";
  const esDate = date.toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const splitDate = esDate.toString().split(" ");
  const dia = splitDate[0];
  const mes = splitDate[2][0].toUpperCase() + splitDate[2].slice(1, 3);
  const año = splitDate[4].slice(0, 4);
  const hora = splitDate[5];

  return dia + " " + mes + ", " + año + " - " + hora;
};
