var Fancy = function() {
    this.MOD = 1000000007n;
    this.seq = [];
    this.mul = 1n;
    this.add = 0n;
};

Fancy.prototype.modPow = function(base, exp) {
    let mod = this.MOD;
    base = base % mod;
    let result = 1n;

    while (exp > 0n) {
        if (exp % 2n === 1n) result = (result * base) % mod;
        base = (base * base) % mod;
        exp = exp / 2n;
    }

    return result;
};

Fancy.prototype.modInv = function(x) {
    return this.modPow(x, this.MOD - 2n);
};

/** 
 * @param {number} val
 * @return {void}
 */
Fancy.prototype.append = function(val) {
    let v = BigInt(val);
    let inv = this.modInv(this.mul);
    let x = (v - this.add + this.MOD) % this.MOD;
    x = (x * inv) % this.MOD;
    this.seq.push(x);
};

/** 
 * @param {number} inc
 * @return {void}
 */
Fancy.prototype.addAll = function(inc) {
    this.add = (this.add + BigInt(inc)) % this.MOD;
};

/** 
 * @param {number} m
 * @return {void}
 */
Fancy.prototype.multAll = function(m) {
    let mm = BigInt(m);
    this.mul = (this.mul * mm) % this.MOD;
    this.add = (this.add * mm) % this.MOD;
};

/** 
 * @param {number} idx
 * @return {number}
 */
Fancy.prototype.getIndex = function(idx) {
    if (idx >= this.seq.length) return -1;

    let val = (this.seq[idx] * this.mul + this.add) % this.MOD;
    return Number(val);
};