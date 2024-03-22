export const isFunction = fn => typeof fn === 'function';

export const generateID = () => Math.random().toString(36).substring(2, 9);
