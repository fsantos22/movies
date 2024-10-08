import Header from '@/components/Header'
import Sidemenu from '@/components/Sidemenu'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import 'tailwindcss/tailwind.css'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'MOVIES',
  description: 'Seu catálogo de filmes e séries',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} flex flex-col items-start bg-[#0D0D0D] text-white`}>
        <Header />
        <main className="flex">
          <Sidemenu />
          <div className="w-full">{children}</div>
        </main>
      </body>
    </html>
  )
}
