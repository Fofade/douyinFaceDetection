r = Object.prototype.toString.call(""); // [object String]
log(r);
r = Object.prototype.toString.call(1); // [object Number]
log(r);
r = Object.prototype.toString.call(true); // [object Boolean]
log(r);
r = Object.prototype.toString.call(Symbol()); //[object Symbol]
log(r);
r = Object.prototype.toString.call(undefined); // [object Undefined]
log(r);
r = Object.prototype.toString.call(null); // [object Null]
log(r);
r = Object.prototype.toString.call(new Function()); // [object Function]
log(r);
r = Object.prototype.toString.call(new Date()); // [object Date]
log(r);
r = Object.prototype.toString.call([]); // [object Array]
log(r);
r = Object.prototype.toString.call(new RegExp()); // [object RegExp]
log(r);
r = Object.prototype.toString.call(new Error()); // [object Error]
log(r);