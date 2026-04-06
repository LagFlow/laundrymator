import { Settings } from "~/interfaces/settings.interface";

export function setFreshLimit(limit: number): void {
  console.log("gg?");
  localStorage.setItem(Settings.FRESH_LIMIT, limit.toString());
}

export function getFreshLimit(): number | undefined {
  const value = localStorage.getItem(Settings.FRESH_LIMIT);
  return !!value ? parseInt(value) : undefined;
}

export function setUsedLimit(limit: number): void {
  localStorage.setItem(Settings.USED_LIMIT, limit.toString());
}

export function getUsedLimit(): number | undefined {
  const value = localStorage.getItem(Settings.USED_LIMIT);
  return !!value ? parseInt(value) : undefined;
}

export function setWashLimit(limit: number): void {
  localStorage.setItem(Settings.WASH_LIMIT, limit.toString());
}

export function getWashLimit(): number | undefined {
  const value = localStorage.getItem(Settings.WASH_LIMIT);
  return !!value ? parseInt(value) : undefined;
}
