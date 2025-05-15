// components/Footer.tsx

interface FooterProps {
  phone?: string;
  email?: string;
}

export default function Footer({ phone, email }: FooterProps) {
  return (
    <footer className="text-center py-10 bg-gray-200">
      <p>{phone}</p>
      <p>{email}</p>
    </footer>
  );
}
