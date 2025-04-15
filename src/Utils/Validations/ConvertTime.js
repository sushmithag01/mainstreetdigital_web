function tConv24(time24) {
  var ts = time24;
  var H = +ts.substr(0, 2);
  var h = H % 12 || 12;
  h = h < 10 ? 0 + h : h;
  var ampm = H < 12 ? " AM" : " PM";
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
}
export const businessHours = (a, b) => {
  if (a && b !== "00:00:00") {
    return tConv24(a) + " to " + tConv24(b);
  } else {
    return "Closed";
  }
};
