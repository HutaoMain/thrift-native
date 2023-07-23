import RootNavigation from "./src/navigation/RootNavigation";
import { QueryClient, QueryClientProvider } from "react-query";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
      <Toast position="top" topOffset={40} />
    </QueryClientProvider>
  );
}
