import { fetchUserMetadata } from '@/app/api/fetchUserMetadata';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function ViewUserPage({ params }: Props) {
  const resolvedParams =  await params;
  const id = await parseInt(resolvedParams.id);
  if (isNaN(id)) return notFound();

  let user;
  try {
    user = await fetchUserMetadata(id);
  } catch (err) {
    console.error(err);
    return notFound();
  }

  const meta = user.all_metadata || {};

  return (
    <div className="p-6 text-white max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Details: {user.user_login}</h1>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src={user.avatar_url || '/default-avatar.png'}
            alt="Avatar"
            className="w-20 h-20 rounded-full border border-gray-600"
          />
          <div>
            <p className="text-lg font-semibold">{user.display_name}</p>
            <p className="text-sm text-gray-400">Email: {user.user_email}</p>
            <p className="text-sm text-gray-400">Registered: {new Date(user.user_registered).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <InfoRow label="Billing First Name" value={meta.billing_first_name} />
          <InfoRow label="Billing Last Name" value={meta.billing_last_name} />
          <InfoRow label="Billing Company" value={meta.billing_company} />
          <InfoRow label="Billing Address 1" value={meta.billing_address_1} />
          <InfoRow label="Billing Address 2" value={meta.billing_address_2} />
          <InfoRow label="Billing City" value={meta.billing_city} />
          <InfoRow label="Billing State" value={meta.billing_state} />
          <InfoRow label="Billing Postcode" value={meta.billing_postcode} />
          <InfoRow label="Billing Country" value={meta.billing_country} />
          <InfoRow label="Paying Customer" value={meta.paying_customer} />
          <InfoRow label="Activation Status" value={meta.user_activation_status} />
          <InfoRow label="Phone Number" value={meta.phone_number} />
          <InfoRow label="Membership Status" value={meta.membership_status} />
          <InfoRow label="Active Plan" value={meta.active_membership_plan} />
          <InfoRow label="Membership Expiry" value={meta.membership_expiry_date} />
          <InfoRow label="Last Membership Plan" value={meta.last_membership_plan} />
          <InfoRow label="Last Membership Expiry" value={meta.last_membership_expiry_date} />
          <InfoRow label="Private Servers Access" value={meta.private_servers_access} />
          <InfoRow label="Terms Accepted" value={meta.terms_accepted} />
          <InfoRow label="Mobile Session Start" value={meta.mobile_session_start} />
          <InfoRow label="Terms Accepted Date" value={meta.terms_accepted_date} />
          <InfoRow label="Terms Version Accepted" value={meta.terms_version_accepted} />
          <InfoRow label="Privacy Accepted" value={meta.privacy_accepted} />
          <InfoRow label="Privacy Accepted Date" value={meta.privacy_accepted_date} />
          <InfoRow label="Privacy Version Accepted" value={meta.privacy_version_accepted} />
          <InfoRow label="Consent IP Address" value={meta.consent_ip_address} />
          <InfoRow label="Terms Acceptance Method" value={meta.terms_acceptance_method} />
          <InfoRow label="Campaign Membership Granted" value={meta.campaign_membership_granted} />
          <InfoRow label="Campaign Grant Date" value={meta.campaign_grant_date} />
          <InfoRow label="Membership Auto Expired At" value={meta.membership_auto_expired_at} />
          <InfoRow label="Membership Auto Expired By" value={meta.membership_auto_expired_by} />
          <InfoRow label="Custom Avatar URL" value={meta.custom_avatar_url} />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="bg-slate-800 p-4 rounded-md border border-slate-700">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-base font-medium text-white">{value || '-'}</p>
    </div>
  );
}




