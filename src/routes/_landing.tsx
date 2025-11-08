import { createFileRoute, Outlet } from "@tanstack/react-router";
import LandingFooter from "@/components/landing/landing-footer";
import LandingHeader from "@/components/landing/landing-header";

export const Route = createFileRoute("/_landing")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    // biome-ignore lint/correctness/useUniqueElementIds: <false>
    <div className="min-h-screen min-h-[100dvh] flex flex-col" id="home">
      <LandingHeader />
      <div className="flex-grow">
        <Outlet />
      </div>
      <LandingFooter />
    </div>
  );
}
