import MusicPlayer from "@/components/musicplayer/MusicPlayer";
import Navbar from "@/components/musicplayer/Navbar";
import MusicSection from "@/components/musicplayer/MusicSection";
import { AllSongs } from "@/components/musicplayer/AllSongs";

function Home() {

  return (
    <main className="main">
    <div className="player-section">
      
      <MusicPlayer />
    </div>
    <div className="content-section">
      <AllSongs />
      <MusicSection />
    </div>
    </main>
  );
}

export default Home;
