
import { Dancing_Script } from 'next/font/google'
import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Footer } from '../components/Footer';

const url = process.env.NEXT_PUBLIC_API_URL_ALL;

export const dancingScript = Dancing_Script({ weight: "700", subsets: ['latin'] })

export default async function Page() {
  async function getFlowers() {
    const res = await fetch(url, { cache: "no-store" })
    const { items } = await res.json()
    return items
  }

  const flowers = await getFlowers()
  console.log(flowers)
  return (
    <>
      <div className=" space-y-3 lg:space-y-8 relative">
        <Header />
        <Input />

        <div className=" lg:grid lg:grid-cols-4 gap-1 lg:gap-6">
          {flowers.map(({ id, content, additionalData }) => {
            return <Card key={id} id={id} content={content} additionalData={additionalData} />
          })}
        </div>
        <Footer />
      </div>
    </>

  )
}
