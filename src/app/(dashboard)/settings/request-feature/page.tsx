import UserAccountNav from "@/components/user-account-nav";
import SettingsNav from "@/components/settings-nav";
import { OrganizationForm } from "@/components/organization-form";
import { FeedbackForm } from "@/components/feature-request-form";

export default function Organization() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <UserAccountNav active="settings"></UserAccountNav>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
              <h1 className="text-3xl font-semibold">Settings</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
              <SettingsNav activeItem="Request Feature"></SettingsNav>
              <div className="grid gap-6">
                <div className="space-y-6">
                  <FeedbackForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}