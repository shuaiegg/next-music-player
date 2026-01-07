import MusicPlayer from "@/components/musicplayer/MusicPlayer";
import MusicSection from "@/components/musicplayer/MusicSection";
import { AllSongs } from "@/components/musicplayer/AllSongs";
import { MusicProvider } from "@/hooks/useMusic";

function Home() {
  return (
    <MusicProvider>
      <main className="min-h-screen w-full px-4 py-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">
          {/* Player sidebar */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <MusicPlayer />
          </div>

          {/* Content area */}
          <div className="flex flex-col gap-8">
            <AllSongs />
            <MusicSection />
          </div>
        </div>
      </main>
    </MusicProvider>
  );
}

export default Home;
