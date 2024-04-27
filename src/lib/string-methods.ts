export function removeAccents(text: string): string {
  if (!text) return "";
  return String(text).normalize("NFD").replace(/\p{M}/gu, "").trim();
}

export function removeNonCharOrNum(text: string): string {
  const nonCharOrDigitsRegex = /[^\p{L}\d\s]/gu;

  return text.replace(nonCharOrDigitsRegex, "").replace(/\s+/g, " ");
}

export function isEquivalentTo(text1: string, text2: string): boolean {
  try {
    const _text1 = removeAccents(String(text1)).toLowerCase();
    const _text2 = removeAccents(String(text2)).toLowerCase();

    return _text1 === _text2;
  } catch (error) {
    return false;
  }
}

export function hasEquivalentIn(text: string, texts: string[]): boolean {
  try {
    if (!Array.isArray(texts)) return false;

    const _text = removeAccents(String(text)).toLowerCase();
    const _array = texts.map((txt) => removeAccents(String(txt)).toLowerCase());

    return _array.includes(_text);
  } catch (error) {
    return false;
  }
}

export function dateBrToIso(stringDate: string): string {
  const validDate = /^([0-2]\d|3[0-1])\/(0[1-9]|1[0-2])\/([1-2]\d{3})$/;
  if (validDate.test(String(stringDate).trim())) {
    return String(stringDate).trim().replace(validDate, "$3-$2-$1");
  }
  return String(stringDate);
}

export function validateDateIso(stringDate: string): boolean {
  const validDate = /^([1-2]\d{3})-(0[1-9]|1[0-2])-([0-2]\d|3[0-1])$/;
  return validDate.test(String(stringDate).trim());
}

export function dateIsoToBr(stringDate: string): string {
  const validDate = /^([1-2]\d{3})-(0[1-9]|1[0-2])-([0-2]\d|3[0-1])$/;
  if (validDate.test(String(stringDate).trim())) {
    return String(stringDate).trim().replace(validDate, "$3/$2/$1");
  }
  return String(stringDate);
}

export function isoStringToDate(stringDate: string, fallback?: Date): Date {
  if (!validateDateIso) return fallback ?? new Date();

  return new Date(`${stringDate}T12:00:00.000Z`);
}
