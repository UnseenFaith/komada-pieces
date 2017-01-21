module.exports = (str, l) => {
  let x = str.substring(0, l).lastIndexOf(" ");
  let pos = x === -1 ? l : x;
  return str.substring(0, pos);
};
