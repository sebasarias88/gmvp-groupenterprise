/**
 * Business rules shown in the investor simulator (taken from the FAQ).
 * Set `sharePrice` (COP) to display investment amounts; leave null to hide them.
 * `installmentOptions` are illustrative plans — confirm them with the client.
 */
export const investmentRules = {
  minShares: 10,
  maxShares: 100,
  horizonMonths: 60,
  dividendEveryMonths: 4,
  firstDividendMonth: 12,
  buybackFromMonth: 30,
  sharePrice: null as number | null,
  installmentOptions: [6, 12, 18, 24],
};
