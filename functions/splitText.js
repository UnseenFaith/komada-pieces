module.exports = (str, l) => {
  var pos = str.substring(0, l).lastIndexOf(' ');
  return str.substring(0, pos);
};
