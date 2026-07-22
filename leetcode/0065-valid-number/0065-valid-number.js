class NumberState {
    canEnd() {
        return false;
    }

    toNextState(c) {
        throw new Error();
    }

    isDigit(c) {
        return c >= '0' && c <= '9';
    }

    isE(c) {
        return c === 'e' || c === 'E';
    }
}

class Start extends NumberState {
    toNextState(c) {
        if (c === '+' || c === '-') {
            return new Sign();
        } else if (this.isDigit(c)) {
            return new BeforeDotNumber();
        } else if (c === '.') {
            return new StartWithDot();
        }
        throw new Error();
    }
}

class Sign extends NumberState {
    toNextState(c) {
        if (this.isDigit(c)) {
            return new BeforeDotNumber();
        } else if (c === '.') {
            return new StartWithDot();
        }
        throw new Error();
    }
}

class BeforeDotNumber extends NumberState {
    canEnd() {
        return true;
    }

    toNextState(c) {
        if (this.isDigit(c)) {
            return this;
        } else if (c === '.') {
            return new Dot();
        } else if (this.isE(c)) {
            return new ExponentStart();
        }
        throw new Error();
    }
}

class StartWithDot extends NumberState {
    toNextState(c) {
        if (this.isDigit(c)) {
            return new AfterDotNumber();
        }
        throw new Error();
    }
}

class Dot extends NumberState {
    canEnd() {
        return true;
    }

    toNextState(c) {
        if (this.isDigit(c)) {
            return new AfterDotNumber();
        } else if (this.isE(c)) {
            return new ExponentStart();
        }
        throw new Error();
    }
}

class AfterDotNumber extends NumberState {
    canEnd() {
        return true;
    }

    toNextState(c) {
        if (this.isDigit(c)) {
            return this;
        } else if (this.isE(c)) {
            return new ExponentStart();
        }
        throw new Error();
    }
}

class ExponentStart extends NumberState {
    toNextState(c) {
        if (c === '+' || c === '-') {
            return new ExponentSign();
        } else if (this.isDigit(c)) {
            return new ExponentNumber();
        }
        throw new Error();
    }
}

class ExponentSign extends NumberState {
    toNextState(c) {
        if (this.isDigit(c)) {
            return new ExponentNumber();
        }
        throw new Error();
    }
}

class ExponentNumber extends NumberState {
    canEnd() {
        return true;
    }

    toNextState(c) {
        if (this.isDigit(c)) {
            return this;
        }
        throw new Error();
    }
}

/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function (s) {
    let state = new Start();

    try {
        for (const c of s) {
            state = state.toNextState(c);
        }
        return state.canEnd();
    } catch {
        return false;
    }
};