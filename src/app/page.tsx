import LeftPanel from "@/components/home/LeftPanel";
import RightPanel from "@/components/home/RightPanel";


export default function Home() {

  return (
    <main className="flex min-h-screen">

      <LeftPanel />
      <RightPanel />
    </main>
  );
}
