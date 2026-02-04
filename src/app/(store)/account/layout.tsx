import { Sidebar } from "@/app/(store)/account/component/Sidebar";
import { getAuthToken } from "@/lib/cookies";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getAuthToken();

  return (
    <div className={`h-screen ${token ? "flex" : ""} flex-col md:flex-row`}>
      {token && (
        <div>
          <Sidebar />
        </div>
      )}

      {/* main content */}
      <main className="w-full flex overflow-y-auto mx-2">{children}</main>
    </div>
  );
}
