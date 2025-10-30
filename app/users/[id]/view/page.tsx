// app/users/[id]/view/page.tsx
import { fetchUserMetadata } from "@/lib/users/fetchUserMetadata";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound, redirect } from "next/navigation";
import type { UserMetadata } from "@/types/users";
import Image from "next/image";

interface UserViewPageProps {
  params: Promise<{ id: string }>;
}

// Helper component for displaying info rows
function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | boolean | null;
}) {
  const displayValue =
    value !== undefined && value !== null && value !== "" ? String(value) : "-";

  return (
    <div className="bg-slate-800/50 p-3 rounded">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-sm text-white break-words">{displayValue}</p>
    </div>
  );
}

export default async function UserViewPage({ params }: UserViewPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  try {
    const user: UserMetadata = await fetchUserMetadata(id);

    if (!user) {
      notFound();
    }

    const meta = user.meta || {};
    const allMeta = user.all_metadata || {};

    return (
      <div className="p-6 text-white max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          User Details: {user.user_login}
        </h1>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Image
              src={user.avatar_url || "public/avatar-default-svgrepo-com.svg"}
              alt="User avatar"
              width={128}
              height={128}
              className="rounded-full"
            />
            <div>
              <p className="text-lg font-semibold">{user.display_name}</p>
              <p className="text-sm text-gray-400">Email: {user.user_email}</p>
              <p className="text-sm text-gray-400">
                Registered:{" "}
                {new Date(user.user_registered).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {/* From user.meta */}
            <InfoRow
              label="Activation Status"
              value={meta.user_activation_status}
            />
            <InfoRow label="Membership Status" value={meta.membership_status} />
            <InfoRow label="Active Plan" value={meta.active_membership_plan} />
            <InfoRow
              label="Membership Expiry"
              value={meta.membership_expiry_date}
            />
            <InfoRow
              label="Last Membership Plan"
              value={meta.last_membership_plan}
            />
            <InfoRow
              label="Last Membership Expiry"
              value={meta.last_membership_expiry_date}
            />
            <InfoRow label="Rewarded Coins" value={meta.rewarded_coins} />
            <InfoRow
              label="Registration Source"
              value={meta.registration_source}
            />
            <InfoRow label="Terms Accepted" value={meta.terms_accepted} />
            <InfoRow
              label="Terms Accepted Date"
              value={meta.terms_accepted_date}
            />
            <InfoRow
              label="Terms Version Accepted"
              value={meta.terms_version_accepted}
            />
            <InfoRow label="Privacy Accepted" value={meta.privacy_accepted} />
            <InfoRow
              label="Privacy Accepted Date"
              value={meta.privacy_accepted_date}
            />
            <InfoRow
              label="Privacy Version Accepted"
              value={meta.privacy_version_accepted}
            />
            <InfoRow
              label="Consent IP Address"
              value={meta.consent_ip_address}
            />
            {/* From user.all_metadata (if you have these fields) */}
            <InfoRow
              label="Billing First Name"
              value={allMeta.billing_first_name}
            />
            <InfoRow
              label="Billing Last Name"
              value={allMeta.billing_last_name}
            />
            <InfoRow label="Billing Company" value={allMeta.billing_company} />
            <InfoRow
              label="Billing Address 1"
              value={allMeta.billing_address_1}
            />
            <InfoRow
              label="Billing Address 2"
              value={allMeta.billing_address_2}
            />
            <InfoRow label="Billing City" value={allMeta.billing_city} />
            <InfoRow label="Billing State" value={allMeta.billing_state} />
            <InfoRow
              label="Billing Postcode"
              value={allMeta.billing_postcode}
            />
            <InfoRow label="Billing Country" value={allMeta.billing_country} />
            <InfoRow label="Phone Number" value={allMeta.phone_number} />
            <InfoRow label="Paying Customer" value={allMeta.paying_customer} />
            <InfoRow
              label="Private Servers Access"
              value={allMeta.private_servers_access}
            />
            <InfoRow
              label="Mobile Session Start"
              value={allMeta.mobile_session_start}
            />
            <InfoRow
              label="Terms Acceptance Method"
              value={allMeta.terms_acceptance_method}
            />
            <InfoRow
              label="Campaign Membership Granted"
              value={allMeta.campaign_membership_granted}
            />
            <InfoRow
              label="Campaign Grant Date"
              value={allMeta.campaign_grant_date}
            />
            <InfoRow
              label="Membership Auto Expired At"
              value={allMeta.membership_auto_expired_at}
            />
            <InfoRow
              label="Membership Auto Expired By"
              value={allMeta.membership_auto_expired_by}
            />
            <InfoRow
              label="Custom Avatar URL"
              value={allMeta.custom_avatar_url}
            />
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error("❌ Failed to fetch user metadata:", err);
    notFound();
  }
}
