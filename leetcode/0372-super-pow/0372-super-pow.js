var superPow = function(a, b) {
    let result = 1;
    const MOD = 1337;

    const quickPower = (base, exponent) => {
        let powerResult = 1;

        while (exponent > 0) {
            if (exponent & 1) {
                powerResult =
                    Number(
                        (BigInt(powerResult) * BigInt(base)) %
                        BigInt(MOD)
                    );
            }

            base =
                Number(
                    (BigInt(base) * BigInt(base)) %
                    BigInt(MOD)
                );

            exponent >>= 1;
        }

        return powerResult;
    };

    for (let i = b.length - 1; i >= 0; i--) {
        result =
            Number(
                (BigInt(result) *
                    BigInt(quickPower(a, b[i]))) %
                BigInt(MOD)
            );

        a = quickPower(a, 10);
    }

    return result;
};