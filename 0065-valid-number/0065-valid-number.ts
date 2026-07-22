interface NumberState {
    canEnd(): boolean;
    toNextState(c: string): NumberState;
}

abstract class BaseState implements NumberState {
    canEnd(): boolean {
        return false;
    }

    abstract toNextState(c: string): NumberState;

    protected isDigit(c: string): boolean {
        return c >= '0' && c <= '9';
    }

    protected isE(c: string): boolean {
        return c === 'e' || c === 'E';
    }
}

class Start extends BaseState {
    toNextState(c: string): NumberState {
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

class Sign extends BaseState {
    toNextState(c: string): NumberState {
        if (this.isDigit(c)) {
            return new BeforeDotNumber();
        } else if (c === '.') {
            return new StartWithDot();
        }
        throw new Error();
    }
}

class BeforeDotNumber extends BaseState {
    canEnd(): boolean {
        return true;
    }

    toNextState(c: string): NumberState {
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

class StartWithDot extends BaseState {
    toNextState(c: string): NumberState {
        if (this.isDigit(c)) {
            return new AfterDotNumber();
        }
        throw new Error();
    }
}

class Dot extends BaseState {
    canEnd(): boolean {
        return true;
    }

    toNextState(c: string): NumberState {
        if (this.isDigit(c)) {
            return new AfterDotNumber();
        } else if (this.isE(c)) {
            return new ExponentStart();
        }
        throw new Error();
    }
}

class AfterDotNumber extends BaseState {
    canEnd(): boolean {
        return true;
    }

    toNextState(c: string): NumberState {
        if (this.isDigit(c)) {
            return this;
        } else if (this.isE(c)) {
            return new ExponentStart();
        }
        throw new Error();
    }
}

class ExponentStart extends BaseState {
    toNextState(c: string): NumberState {
        if (c === '+' || c === '-') {
            return new ExponentSign();
        } else if (this.isDigit(c)) {
            return new ExponentNumber();
        }
        throw new Error();
    }
}

class ExponentSign extends BaseState {
    toNextState(c: string): NumberState {
        if (this.isDigit(c)) {
            return new ExponentNumber();
        }
        throw new Error();
    }
}

class ExponentNumber extends BaseState {
    canEnd(): boolean {
        return true;
    }

    toNextState(c: string): NumberState {
        if (this.isDigit(c)) {
            return this;
        }
        throw new Error();
    }
}

function isNumber(s: string): boolean {
    let state: NumberState = new Start();

    try {
        for (const c of s) {
            state = state.toNextState(c);
        }
        return state.canEnd();
    } catch {
        return false;
    }
}