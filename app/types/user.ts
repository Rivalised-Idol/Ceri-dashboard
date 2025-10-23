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
    [key: number]: number;
  };

  //all_metadata: Record<string, any>;
}