/**
 *
 * @param {string} name
 * @param {string|undefined} message
 * @returns Error
 */

export function CustomError(name, message) {
    const error = new Error(message);
    error.name = name;
    return error;
}
