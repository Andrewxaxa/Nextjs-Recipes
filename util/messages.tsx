const capitalizeFirstLetter = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const REQUIRED_MESSAGE = (subject: string) =>
  `${capitalizeFirstLetter(subject)} is required`;
export const TOO_LONG_MESSAGE = (subject: string) =>
  `${capitalizeFirstLetter(subject)} is too long`;
