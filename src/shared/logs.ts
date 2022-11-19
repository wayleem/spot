function log(n: Number, ...s: String[]) {
    print("(", n, ")", ...s)
}

export function debug(...s: String[]) {
    log(1, ...s)
}

export function warn(...s: String[]) {
    log(2, ...s)
}

export function fatal(...s: String[]) {
    log(3, ...s)
}