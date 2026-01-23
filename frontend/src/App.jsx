import AppRoutes from "./Router/AppRoutes";
import { Toaster } from "./components/ui/toaster";
function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position="bottom-right" richColors />
    </>
  );
}

export default App;
//bugs
// no need to refresh the page while adding the new car
// add some animation on notifcation opening
// i will marquee of magic ui in user login page
// there is bug when login and go to dashboard of admin/dealer i have to reload the page
