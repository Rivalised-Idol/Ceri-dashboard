// /types/user.ts

export interface UserMeta {
  user_activation_status: string;
  membership_status: string;
  active_membership_plan: string;
  membership_expiry_date: string;
  last_membership_plan: string;
  last_membership_expiry_date: string;
  rewarded_coins: number;
  terms_accepted: boolean;
  terms_accepted_date: string;
  terms_version_accepted: string;
  privacy_accepted: boolean;
  privacy_accepted_date: string;
  privacy_version_accepted: string;
  consent_ip_address: string;
  registration_source: string;
}

export interface UserFields {
  id: number;
  user_login: string;
  user_email: string;
  user_nicename: string;
  user_url: string;
  user_registered: string;
  user_status: number;
  display_name: string;
  first_name: string;
  last_name: string;
  roles: string[];
  capabilities: string[];
  meta: UserMeta;
  is_verified: string;
  is_premium: boolean;
  full_name: string;
  avatar_url: string;
  last_login: string;
  login_count: number;
}

export interface AllMetadata {
  [key: string]: string; // dynamic key-value pairs, since WP metadata keys can vary
}

export interface UserMetadata {
  id: number;
  user_login: string;
  user_email: string;
  user_nicename: string;
  user_url: string;
  user_registered: string;
  user_status: number;
  display_name: string;
  first_name: string;
  last_name: string;
  nickname: string;
  description: string;
  roles: string[];
  capabilities: string[];
  meta: UserMeta;
  all_metadata: AllMetadata;
  is_verified: string;
  is_premium: boolean;
  full_name: string;
  avatar_url: string;
  last_login: string;
  login_count: number;
  post_count: string;
}

export interface UsersApiResponse {
  success: boolean;
  count: number;
  users: AdminUser[];
}

export interface UserMetadataResponse {
  success: boolean;
  user: UserMetadata;
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
  data?: {
    user_id: number | string;
  };
}

//updateMembershipStatus

export interface MembershipStatusData {
  user_id: string;
  user_email: string;
  user_login: string;
  old_membership_status: string;
  new_membership_status: string;
  active_membership_plan: string;
  membership_expiry_date: string;
  updated_by: string;
  updated_at: string;
}

export interface MembershipStatusResponse {
  success: boolean;
  message: string;
  data?: MembershipStatusData;
}
