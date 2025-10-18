
// /lib/fetchUserMetadata.ts

'use client';

import { getSession } from 'next-auth/react';

export interface UserMetadata {
  id: number;
  user_login: string;
  user_email: string;
  display_name: string;
  user_registered: string;
  avatar_url?: string;
  is_verified: boolean;
  is_premium: boolean;
  login_count: number;

  meta: {
    first_name?: string;
    last_name?: string;
    description?: string;
    wp_user_level?: string;

    billing_first_name?: string;
    billing_last_name?: string;
    billing_company?: string;
    billing_address_1?: string;
    billing_address_2?: string;
    billing_city?: string;
    billing_state?: string;
    billing_postcode?: string;
    billing_country?: string;

    paying_customer?: string;
    user_activation_status?: string;
    phone_number?: string;

    membership_status?: string;
    active_membership_plan?: string;
    membership_expiry_date?: string;
    last_membership_plan?: string;
    last_membership_expiry_date?: string;
    private_servers_access?: string;

    terms_accepted?: string;
    mobile_session_start?: string;
    terms_accepted_date?: string;
    terms_version_accepted?: string;
    privacy_accepted?: string;
    privacy_accepted_date?: string;
    privacy_version_accepted?: string;
    consent_ip_address?: string;
    terms_acceptance_method?: string;

    campaign_membership_granted?: string;
    campaign_grant_date?: string;
    membership_auto_expired_at?: string;
    membership_auto_expired_by?: string;

    custom_avatar_url?: string;
    [key: string]: any;
  };

  all_metadata: Record<string, any>;
}

export async function fetchUserMetadata(
  id: string | number
): Promise<UserMetadata> {
  // 🟢 Get session dynamically
  const session = await getSession();
  const token = session?.accessToken;

  if (!token) {
    throw new Error('No active session found. Please log in again.');
  }

  // 🔐 Authenticated request
  const res = await fetch(
    `https://cerivpn.com/wp-json/custom/v1/admin/users/${id}?ID=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Secure dynamic token
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    console.error(`❌ Failed to fetch user metadata for ID ${id}:`, errText);
    throw new Error(`Failed to fetch user metadata for ID ${id}`);
  }

  const data = await res.json();
  return data.user; // ✅ Extract and return the user object
}


