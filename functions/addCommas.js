/*
  This piece keeps here for compatibility. However, Number.toLocaleString() does pretty much the same.
  Check it here: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
*/
module.exports = (nStr) => {
  nStr += "";
  const x = nStr.split(".");
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : "";
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1,$2");
  }
  return x1 + x2;
};

module.exports.conf = { requiredModules: [] };
module.exports.help = {
  name: "addCommas",
  type: "functions",
  description: "Add commas in every three characters.",
};
