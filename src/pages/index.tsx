import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import SmallCard from "@/components/SmallCard";
import MediumCard from "@/components/MediumCard";

export default function Home({ exploreData, cardsData }: any) {
  return (
    <div className="">
      <Head>
        <title>Cam Airbnb</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <main className="mx-auto max-w-7xl px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="pb-5 text-4xl font-semibold">Explore Nearby</h2>
          {/* pull some data from a server -API points */}
          <div className="lg:grid-col-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item: { img: string; location: string; distance: string }) => (
              <SmallCard
                key={item.img}
                img={item.img}
                location={item.location}
                distance={item.distance}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="py-8 text-4xl font-semibold ">Live Anywhere</h2>
          <div className="-ml-3 flex space-x-3 overflow-scroll p-3 scrollbar-hide">
            {cardsData?.map((item: { img: string; title: string }) => (
              <MediumCard key={item.img} img={item.img} title={item.title} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://www.jsonkeeper.com/b/4G1G").then((res) => res.json());
  const cardsData = await fetch("https://www.jsonkeeper.com/b/VHHT").then((res) => res.json());

  return { props: { exploreData, cardsData } };
}
