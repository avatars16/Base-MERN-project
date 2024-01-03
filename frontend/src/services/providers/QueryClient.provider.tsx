import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import { ErrorResponse } from "../../../../shared/types/responses/error-response";

export default function QueryClientWrapper({ children }: { children: React.ReactNode }) {
    //If we ever wanna do global error handling for react-query, here is the tutorial:
    //https://www.paulashraf.com/blog/global-error-handler-react-query
    const queryCache = new QueryCache({
        onError: (error, query) => {
            const err = error as unknown as ErrorResponse;
            console.log(err);
            //If we get a unauthorized or forbidden error, set data to null to invalidate the cache
            if (err.error.code == 400 || err.error.code == 401 || err.error.code == 403) {
                query.state.data = null;
                query.invalidate();
            }
        },
    });
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: (failureCount, error) => {
                    const apiReponseError = error as unknown as ErrorResponse;
                    if (apiReponseError.error.code == 401 || apiReponseError.error.code == 403) return false;
                    if (failureCount > 3) return false;
                    return true;
                },
            },
        },
        queryCache,
    });
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
