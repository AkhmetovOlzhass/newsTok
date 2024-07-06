import Image from "next/image";
import VideoList from "./components/VideoList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
    <VideoList />
    </main>
  );
}
