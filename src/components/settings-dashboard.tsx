import { AccountForm } from "@/components/account-form";
import SettingsNav from "./settings-nav";
import { OrganizationForm } from "./organization-form";
import { PublicContactForm } from "./public-contact-info-form";
import { PrivateContactForm } from "./private-contact-info-form";
import { SupportForm } from "./support-form";
import { FeedbackForm } from "./feature-request-form";

export function SettingsDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <SettingsNav activeItem="General"></SettingsNav>
          <div className="grid gap-6">
            <div className="space-y-6">
              <AccountForm />
              <OrganizationForm></OrganizationForm>
              <PublicContactForm></PublicContactForm>
              <PrivateContactForm></PrivateContactForm>
              <SupportForm></SupportForm>
              <FeedbackForm></FeedbackForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
