export interface ExperienceDuration {
  years: number;
  months: number;
  formatted: string; // e.g., "2 Years 9 Months" or "3 Years"
  shortFormatted: string; // e.g., "2y 9m" or "3y"
  badgeFormatted: string; // e.g., "2 YRS 9 MOS" or "3 YRS"
}

/**
 * Calculates dynamic career or role experience duration between a start date and target date.
 * Handles month rollovers (e.g., 2 years 12 months -> 3 years).
 */
export function calculateExperience(
  startDateStr?: string | null,
  targetDate: Date = new Date(),
): ExperienceDuration {
  if (!startDateStr) {
    return {
      years: 0,
      months: 0,
      formatted: "",
      shortFormatted: "",
      badgeFormatted: "",
    };
  }

  // Support YYYY-MM or YYYY-MM-DD or full ISO strings
  const parts = startDateStr.split("-");
  const startYear = parseInt(parts[0], 10);
  const startMonth = parseInt(parts[1] || "1", 10) - 1; // 0-indexed month
  const startDay = parseInt(parts[2] || "1", 10);

  if (isNaN(startYear) || isNaN(startMonth)) {
    return {
      years: 0,
      months: 0,
      formatted: "",
      shortFormatted: "",
      badgeFormatted: "",
    };
  }

  // Total elapsed months inclusive of the ongoing month
  let totalMonths =
    (targetDate.getFullYear() - startYear) * 12 +
    (targetDate.getMonth() - startMonth) +
    1;

  if (totalMonths < 0) {
    totalMonths = 0;
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // Singular/Plural text rules
  const yearText = years === 1 ? "1 Year" : `${years} Years`;
  const monthText = months === 1 ? "1 Month" : `${months} Months`;

  let formatted = "";
  if (years > 0 && months > 0) {
    formatted = `${yearText} ${monthText}`;
  } else if (years > 0) {
    formatted = yearText;
  } else if (months > 0) {
    formatted = monthText;
  } else {
    formatted = "0 Months";
  }

  const shortFormatted =
    years > 0 && months > 0
      ? `${years}y ${months}m`
      : years > 0
        ? `${years}y`
        : `${months}m`;

  const badgeFormatted =
    years > 0 && months > 0
      ? `${years} YRS ${months} MOS`
      : years > 0
        ? `${years} YRS`
        : `${months} MOS`;

  return {
    years,
    months,
    formatted,
    shortFormatted,
    badgeFormatted,
  };
}

/**
 * Returns dynamic total experience or falls back to manual string.
 */
export function resolveTotalExperience(profile?: {
  careerStartDate?: string;
  autoCalculateExperience?: boolean;
  totalExperience?: string;
}): string {
  if (!profile) return "2 Years 9 Months";

  if (profile.autoCalculateExperience !== false && profile.careerStartDate) {
    const calc = calculateExperience(profile.careerStartDate);
    if (calc.formatted) return calc.formatted;
  }

  return profile.totalExperience || "2 Years 9 Months";
}
