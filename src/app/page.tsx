/* eslint-disable @next/next/no-img-element */
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";
import { urlFor } from "@/lib/imageBuilder";

const HOME_PAGE_QUERY = defineQuery(`*[_type == "home"]{
  title,
  slug,
  content,
  stats,
  images[]{
    asset,
    alt
  }
}`);

export default async function IndexPage() {
  const { data: home_page_data } = await sanityFetch({
    query: HOME_PAGE_QUERY,
  });
  const { title, content, stats, images } = home_page_data[0];
  return (
    <div className="container mx-auto my-[100px]">
      <p className="text-blue-500 font-bold text-4xl">{title}</p>
      <p className="text-[15px] text-gray-800 my-8">{content}</p>
      <div className="grid grid-cols-4">
        {stats?.map((val: Record<string, string>) => {
          return (
            <div key={val?._key} className="flex flex-col gap-0.5 w-[200px]">
              <p className="text-[40px] font-bold text-red-400">
                {val?.statsCount}
              </p>
              <p className="text-[14px] text-gray-800">{val?.description}</p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between my-32">
        {images?.map((img: any, idx: number) => (
          // eslint-disable-next-line @next/next/no-img-element
          <div key={img.alt} className="h-[300px] max-w-[350px]">
            <img key={idx} src={urlFor(img).url()} alt={img.alt} className="border-[1px] border-gray-400 rounded-lg h-[300px] w-[350px]"/>
            </div>
        ))}
      </div>
    </div>
  );
}
