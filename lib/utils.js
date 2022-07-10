export const compareBy = (key) => {
  return (a, b) => {
    return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
  };
};
