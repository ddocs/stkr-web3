export function isNodeNameValid(value: string) {
    return /^[a-zA-Z0-9-_]+$/.test(value);
}