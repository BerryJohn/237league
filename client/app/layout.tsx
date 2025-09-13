// Since middleware handles the routing, the root layout is simple
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
