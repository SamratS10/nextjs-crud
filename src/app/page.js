import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className=" text-center text-white text-5xl pt-3 font-bold">CRUD APP</h1>
      <div className=" h-[90vh] flex flex-col justify-center items-center gap-3">
        <h1 className=" text-4xl text-white font-bold">Explore our Blogs Collections</h1>
        <Link href="/blog" className=" text-lg bg-white text-black p-2 rounded-xl">Explore Blog Page</Link>
      </div>
    </div>
  );
}
