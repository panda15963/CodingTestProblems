var validUtf8 = function(data) {
    let remainingBytes = 0;

    for (const byte of data) {
        if (remainingBytes > 0) {
            // 10xxxxxx
            if ((byte >> 6) !== 0b10) {
                return false;
            }

            remainingBytes--;
        } else {
            // 0xxxxxxx
            if ((byte >> 7) === 0) {
                remainingBytes = 0;
            }
            // 110xxxxx
            else if ((byte >> 5) === 0b110) {
                remainingBytes = 1;
            }
            // 1110xxxx
            else if ((byte >> 4) === 0b1110) {
                remainingBytes = 2;
            }
            // 11110xxx
            else if ((byte >> 3) === 0b11110) {
                remainingBytes = 3;
            }
            // Invalid start byte
            else {
                return false;
            }
        }
    }

    return remainingBytes === 0;
};