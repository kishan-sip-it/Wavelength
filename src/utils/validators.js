const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isBlankOrWhitespace(value) {
  return !value || value.trim().length === 0;
}

export function validateEmail(value) {
  if (isBlankOrWhitespace(value)) return "Email is required.";
  if (value.trim() !== value) return "Email shouldn't have leading or trailing spaces.";
  if (!EMAIL_REGEX.test(value)) return "That doesn't look like a valid email address.";
  return null;
}

export function validateOtp(value) {
  if (isBlankOrWhitespace(value)) return "Enter the 6-digit code.";
  if (!/^\d{6}$/.test(value)) return "The code must be exactly 6 digits.";
  return null;
}

export function validateUsername(value) {
  if (isBlankOrWhitespace(value)) return "Pick a username — this is how others will find you.";
  const trimmed = value.trim();
  if (trimmed.length < 3) return "Usernames need at least 3 characters.";
  if (trimmed.length > 20) return "Keep it under 20 characters.";
  if (!/^[a-zA-Z0-9_.]+$/.test(trimmed)) return "Only letters, numbers, underscores, and periods, please.";
  return null;
}

export function validateName(value) {
  if (isBlankOrWhitespace(value)) return "We need a name to introduce you by.";
  const trimmed = value.trim();
  if (trimmed.length < 2) return "That name's a bit short — try at least 2 characters.";
  if (trimmed.length > 40) return "Keep it under 40 characters.";
  if (/\d/.test(trimmed)) return "Names shouldn't contain numbers.";
  return null;
}

/** Computes age in whole years from a YYYY-MM-DD date-of-birth string. */
export function calculateAge(dobString) {
  if (!dobString) return null;
  const dob = new Date(dobString + "T00:00:00");
  if (Number.isNaN(dob.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

// The reference app's age step never actually blocks under-18 signups —
// one of the exact gaps this brief calls out. An app for meeting strangers
// at real-world events should never let a minor complete signup, so this
// derives age from date-of-birth (harder to fudge than a free-typed
// number) and blocks progress with a clear message when age < 18.
export function validateDob(value) {
  if (isBlankOrWhitespace(value)) return "We need your date of birth to verify you're eligible.";
  const dob = new Date(value + "T00:00:00");
  if (Number.isNaN(dob.getTime())) return "That doesn't look like a valid date.";
  if (dob > new Date()) return "Date of birth can't be in the future.";

  const age = calculateAge(value);
  if (age < 18) return "You must be 18 or older to join.";
  if (age > 100) return "Please double-check that date.";
  return null;
}

export function validatePronouns(list) {
  if (!list || list.length === 0) return "Select at least one pronoun.";
  if (list.length > 3) return "You can select up to 3 pronouns.";
  return null;
}

export function validateInviteCode(value) {
  if (isBlankOrWhitespace(value)) return null; // optional
  if (!/^[a-zA-Z0-9]{4,12}$/.test(value.trim())) return "Invite codes are 4-12 letters/numbers, no spaces or symbols.";
  return null;
}
