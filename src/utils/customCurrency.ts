export const customCurrency = (value: number, currency: string): string => {
    return `LE ${value.toFixed(2)} ${currency}`;
  };