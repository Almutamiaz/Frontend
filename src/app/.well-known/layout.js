export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate once per day

export default function WellKnownLayout({ children }) {
  return children;
}
