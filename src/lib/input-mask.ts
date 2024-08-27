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

type CurrencyMaskOptions = Partial<{
  forceDecimalPlaces: boolean;
  decimalPlaces: number;
}>;

const currencyMask = (
  value: string | number,
  prefix: string = "",
  options?: CurrencyMaskOptions,
): string => {
  options ??= {};
  options.decimalPlaces ??= 2;
  options.forceDecimalPlaces ??= false;

  if (prefix) {
    prefix = prefix + " ";
  }

  if (!value) return prefix;

  if (typeof value === "number") {
    value = value.toString().replace(".", ",");
  }

  // Remove non-digit characters and limit to two decimal places
  const cleanedValue = value.replace(/[^\d,]/g, "");

  if (cleanedValue.startsWith(",")) {
    return prefix;
  }

  let parts = cleanedValue.split(",");

  // Ensure leading 0 is handled
  if (parts[0]?.startsWith("0") && parts[0].length > 1) {
    if (parts[0].startsWith("00")) {
      parts[0] = "0";
    } else {
      parts[0] = parts[0][1]!;
    }
  }

  // Truncate decimal part to at most two digits
  if (parts[1] && parts[1].length > options.decimalPlaces) {
    parts[1] = parts[1].slice(0, options.decimalPlaces);
  }

  // Ensure only one comma in the whole string
  if (parts.length > 2) {
    parts = [parts[0]!, parts.slice(1).join("")];
  }

  // format integer part with dots each 3 digits
  parts[0] = parts[0]!.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  if (options.forceDecimalPlaces) {
    if (parts[1] == null) parts[1] = "";
    parts[1] = parts[1].padEnd(options.decimalPlaces, "0");
  }

  return `${prefix}${parts.join(",")}`;
};

export const inputMask = {
  phone: phoneMask,
  cpfCnpj: cpfCnpjMask,
  cep: cepMask,
  pix: pixMask,
  currency: currencyMask,
};
