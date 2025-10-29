export class Option<T> {
    private val: T | null;

    private constructor(val: T | null) {
        this.val = val;
    }

    static some<T>(val: T): Option<T> {
        return new Option(val);
    }

    static none<T>(): Option<T> {
        return new Option<T>(null);
    }

    // ---
    
    public isSome(): boolean {
        return this.val !== null;
    }

    public isNone(): boolean {
        return !this.isSome();
    }

    public unwrap(): T {
        if (this.isSome())
            return this.val!;
        else
            throw "Unwrap on 'null'";
    }
}
