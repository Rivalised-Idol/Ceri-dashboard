// lib/auth/permissions.ts

export const ROLES = {
  ADMIN: "admin",
  ACCOUNTANT: "accountant",
  SALES_MARKETING: "sales_marketing",
} as const;

export const ROLE_ACCESS = {
  USERS_MANAGE: [ROLES.ADMIN],
  SERVERS_MANAGE: [ROLES.ADMIN],
  PRODUCTS_MANAGE: [ROLES.ADMIN, ROLES.SALES_MARKETING],
  ORDERS_MANAGE: [ROLES.ADMIN, ROLES.ACCOUNTANT],
};

// Optional utility for easy checks
export function hasAccess(
  role: string | undefined,
  allowedRoles: string[]
): boolean {
  if (!role) return false;
  return allowedRoles.includes(role);
}
