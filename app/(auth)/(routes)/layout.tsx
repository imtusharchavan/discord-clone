export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-full flex items-center justify-center">{children}</body>
    </html>
  );
}
