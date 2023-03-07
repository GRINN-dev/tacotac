export default function AttendeesLayout({
  children,
  params: {},
}: {
  children: React.ReactNode;
  params: {
    organizationSlug: string;
    eventSlug: string;
  };
}) {
  return <>{children}</>;
}
