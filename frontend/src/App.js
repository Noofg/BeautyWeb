import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AppModal from "./components/AppModal";
import useModal from "./hooks/useModal";

function App() {
  const { modal, setModal } = useModal();
  return (
    <><BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <AppModal modal={modal} setModal={setModal} /></>
  );
}

export default App;