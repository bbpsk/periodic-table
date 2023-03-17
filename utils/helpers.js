// for converting user input to valid regex 
const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

module.exports = {escapeRegExp}