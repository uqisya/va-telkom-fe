import "./App.css";
import { Toaster } from "./components/ui/sonner";
import { HomeSessionScreen } from "./pages/HomeSessionScreen";

function App() {
  return (
    <>
      <HomeSessionScreen />
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
