const getDate = (dateToParse: number): string => {
  // const epoch = Date.now();
  const date = new Date(dateToParse).toISOString();

  return date;
};

export {
  getDate,
};