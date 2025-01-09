import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center m-10">
      <h2>Error 404: Not Found</h2>
      <Link href="/en/Account/SignIn">Go To SingIn</Link>
    </div>
  );
}
