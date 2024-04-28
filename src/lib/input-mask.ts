const phoneMask = (value: string): string => {
  if (!value) return "";

  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
    .replace(/(-\d{4})\d+?$/, "$1");
};

const cpfCnpjMask = (value: string): string => {
  if (!value) return "";

  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(
      /(\d{2})(\d).(\d{2})(\d).(\d{2})(\d)-(\d{2})(\d)/,
      "$1.$2$3.$4$5/$6$7$8",
    )
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const cepMask = (value: string): string => {
  if (!value) return "";

  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};

const maskUuid = (value: string): string => {
  if (!value) return "";

  return value
    .replace(/[^\da-f-]/, "")
    .replace(/^([\da-f]{8})([\da-f])/, "$1-$2")
    .replace(/^([\da-f]{8}-[\da-f]{4})([\da-f])/, "$1-$2")
    .replace(/^([\da-f]{8}-[\da-f]{4}-[\da-f]{4})([\da-f])/, "$1-$2")
    .replace(/^([\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4})([\da-f])/, "$1-$2")
    .replace(
      /([\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12})[\da-f]+?$/,
      "$1",
    );
};

const pixMask = (value: string) => {
  if (!value) return "";

  const cleanedValue = value.replace(/\D/g, "");
  if (/@/.test(value)) return value;
  if (/^([\da-f]{8}-)/i.test(value) && value.at(8) === "-")
    return maskUuid(value);
  if (!/^[\d(]/.test(value)) return value;
  if (value.length < 10) return value;
  if (
    !/[.\\/]/.test(value) &&
    cleanedValue.length === 11 &&
    cleanedValue.at(0) !== "0" &&
    cleanedValue.at(2) === "9"
  )
    return phoneMask(value);

  return cpfCnpjMask(value);
};

export const inputMask = {
  phone: phoneMask,
  cpfCnpj: cpfCnpjMask,
  cep: cepMask,
  pix: pixMask,
};
