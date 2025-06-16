import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";

import router from "@/Router";
import useAdKeywordsSocketListener from "@/shared/hooks/useAdKeywordsSocketListener";

const queryClient = new QueryClient();

const App = () => {
  useAdKeywordsSocketListener();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;
