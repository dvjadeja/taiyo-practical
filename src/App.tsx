import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import Sidebar from "./Components/Sidebar";
import { store } from "./redux/store";

import "./App.css";
import ContactsList from "./pages/Contacts/ContactsList";
import AddContact from "./pages/Contacts/AddContact";
import EditContact from "./pages/Contacts/EditContact";
import LineChart from "./pages/Charts/LineChart";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Map from "./pages/Map/Map";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <Router>
          <div className="flex">
            <Sidebar />
            <div className="flex-grow p-4 w-11/12 ml-16">
              <Routes>
                <Route path="*" element={<Navigate to="/contacts" replace />} />
                <Route path="/contacts" element={<ContactsList />} />
                <Route path="/add-contact" element={<AddContact />} />
                <Route path="/edit-contact/:id" element={<EditContact />} />
                <Route path="/chart" element={<LineChart />} />
                <Route path="/map" element={<Map />} />
              </Routes>
            </div>
          </div>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
