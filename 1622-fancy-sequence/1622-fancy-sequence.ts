class Fancy {

    private MOD = 1000000007n
    private seq: bigint[] = []
    private mul = 1n
    private add = 0n

    private modPow(base: bigint, exp: bigint): bigint {
        let result = 1n
        base %= this.MOD

        while (exp > 0n) {
            if (exp % 2n === 1n) result = (result * base) % this.MOD
            base = (base * base) % this.MOD
            exp /= 2n
        }

        return result
    }

    private modInv(x: bigint): bigint {
        return this.modPow(x, this.MOD - 2n)
    }

    append(val: number): void {
        let v = BigInt(val)

        let inv = this.modInv(this.mul)

        let x = (v - this.add + this.MOD) % this.MOD
        x = (x * inv) % this.MOD

        this.seq.push(x)
    }

    addAll(inc: number): void {
        this.add = (this.add + BigInt(inc)) % this.MOD
    }

    multAll(m: number): void {
        let mm = BigInt(m)

        this.mul = (this.mul * mm) % this.MOD
        this.add = (this.add * mm) % this.MOD
    }

    getIndex(idx: number): number {
        if (idx >= this.seq.length) return -1

        let val = (this.seq[idx] * this.mul + this.add) % this.MOD
        return Number(val)
    }
}