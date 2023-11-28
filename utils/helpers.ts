const getDate = (): string => {
  const epoch = Date.now();
  const date = new Date(epoch).toUTCString();

  return date;
};

export {
  getDate,
};