import AppRoutes from "./Router/AppRoutes";
import { Toaster } from "./components/ui/toaster";
function App() {
  return (
    <>
      
      <AppRoutes/>
      <Toaster position="bottom-right" richColors />

    </>
  );
}

export default App;
