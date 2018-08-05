
export function stripLabel(label) {
    let firstCapital = capitalizeFirst(removeHTML(label))
    return firstCapital
}
export function capitalizeFirst(lowercase_string) {
    return lowercase_string.replace(/^\w/, c => c.toUpperCase());
}
export function removeHTML(string) {
    return string.replace(/<(?:.|\n)*?>/gm, '');
}

