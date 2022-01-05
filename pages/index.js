import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'


export default function Home() {
  return (
    <div>
      <Head>
        <title>ChaTaxi</title>
        <meta name="description" content="Chat para servicio de taxis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar/>

    </div>
  )
}
