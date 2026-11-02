/**
 * City/state-level distributor directory. Where a city has an active
 * entry here, customers are routed to that distributor directly; every
 * inactive entry is a placeholder for a distributor Kay has not yet
 * confirmed contact details for, and must never be rendered. Custom,
 * event and bulk orders always go to the factory regardless of this
 * list — see the "Where to Buy" section on /delivery-areas and the
 * inline notices on /contact and /for-offices for how this is used.
 */
export interface Distributor {
  id: string;
  city: string;
  state: string;
  /** Business or contact name. Empty until Kay confirms it. */
  name: string;
  /** WhatsApp number in wa.me format (digits only, no +). Empty until confirmed. */
  whatsapp: string;
  /** Tap-to-call number in tel: format (with +). Empty until confirmed. */
  phone: string;
  covers: string[];
  sizes: string[];
  sellsToIndividuals: boolean;
  active: boolean;
}

export const DISTRIBUTORS: Distributor[] = [
  {
    id: 'lagos',
    city: 'Lagos',
    state: 'Lagos',
    // No business/contact name has been given for the Lagos distributor
    // anywhere in the codebase — only the phone number on /delivery-areas.
    name: '',
    whatsapp: '2347085085130',
    phone: '+2347085085130',
    covers: ['Lagos Mainland', 'Lagos Island', 'Ikeja'],
    sizes: ['30cl', '50cl', '75cl', '18.9L'],
    sellsToIndividuals: true,
    active: true,
  },
  {
    id: 'uyo',
    city: 'Uyo',
    state: 'Akwa Ibom',
    name: '',
    whatsapp: '',
    phone: '',
    covers: ['Uyo'],
    sizes: [],
    sellsToIndividuals: true,
    active: false,
  },
  {
    id: 'abak',
    city: 'Abak',
    state: 'Akwa Ibom',
    name: '',
    whatsapp: '',
    phone: '',
    covers: ['Abak'],
    sizes: [],
    sellsToIndividuals: true,
    active: false,
  },
  {
    id: 'port-harcourt',
    city: 'Port Harcourt',
    state: 'Rivers',
    name: '',
    whatsapp: '',
    phone: '',
    covers: ['Port Harcourt'],
    sizes: [],
    sellsToIndividuals: true,
    active: false,
  },
];

/** Matches by city or state, active distributors only. Returns null if none found. */
export function findDistributor(stateOrCity: string): Distributor | null {
  const needle = stateOrCity?.trim().toLowerCase();
  if (!needle) return null;
  return (
    DISTRIBUTORS.find(
      (d) => d.active && (d.city.toLowerCase() === needle || d.state.toLowerCase() === needle)
    ) ?? null
  );
}
