import AuthWrapper from "@/components/AuthWrapper";

export default function AccountLayout({ children }) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
