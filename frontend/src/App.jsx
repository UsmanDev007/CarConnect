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
//bugs
// no need to refresh the page while adding the new car