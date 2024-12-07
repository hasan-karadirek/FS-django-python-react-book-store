import { useState } from "react";

/**
 * TypeScript types for the response and the options used in fetch.
 */
interface FetchOptions extends RequestInit {
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

interface FetchResponse {
  success: boolean;
  msg?: string;
  data?: unknown;
  name?: string;
}

export interface CustomError {
  message: string;
  name?: string;
  data?: unknown;
}
/**
 * Our useFetch hook should be used for all communication with the server.
 *
 * Our hook will give you an object with the properties:
 * isLoading - true if the fetch is still in progress
 * error - will contain an Error object if something went wrong
 * performFetch - this function will trigger the fetching. It is up to the user of the hook to determine when to do this!
 * cancelFetch - this function will cancel the fetch, call it when your component is unmounted
 */
const useFetch = (route: string, onReceived: (data: FetchResponse) => void) => {
  /**
   * We use the AbortController which is supported by all modern browsers to handle cancellations
   * For more info: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
   */
  const controller = new AbortController();
  const signal = controller.signal;
  const cancelFetch = () => {
    controller.abort();
  };

  if (route.includes("api/")) {
    /**
     * We add this check here to provide a better error message if you accidentally add the api part
     * As an error that happens later because of this can be very confusing!
     */
    throw new Error(
      "When using the useFetch hook, the route should not include the /api/ part",
    );
  }

  const [error, setError] = useState<CustomError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const performFetch = (options?: FetchOptions) => {
    setError(null);
    setIsLoading(true);

    const baseOptions: FetchOptions = {
      method: "GET",
      headers: {},
      credentials: "include",
    };

    const fetchData = async () => {
      const BASE_SERVER_URL = process.env.NEXT_PUBLIC_BASE_SERVER_URL;
      const BASE_SERVER_SUB_URL = process.env.NEXT_PUBLIC_BASE_SERVER_SUB_URL;
      const isSubdomain = window.location.hostname.startsWith("www");
      // We add the /api subsection here to make it a single point of change if our configuration changes
      const url = `${isSubdomain ? BASE_SERVER_SUB_URL : BASE_SERVER_URL}/api${route}`;

      const res = await fetch(url, { ...baseOptions, ...options, signal });

      const jsonResult: FetchResponse = await res.json();
      if (!res.ok) {
        const customError: CustomError = {
          name: jsonResult.name,
          message:
            jsonResult.msg ||
            `Fetch for ${url} returned an invalid status (${jsonResult}). Received: ${JSON.stringify(jsonResult)}`,
          data: jsonResult.data,
        };

        setError(customError);
        setIsLoading(false);
        return;
      }

      if (jsonResult.success === true) {
        onReceived(jsonResult);
      } else {
        setError({
          name: jsonResult.name,
          message:
            jsonResult.msg ||
            `Fetch for ${url} returned an invalid status (${jsonResult}). Received: ${JSON.stringify(jsonResult)}`,
          data: jsonResult.data,
        });
      }

      setIsLoading(false);
    };

    fetchData().catch((error: Error) => {
      const customError: CustomError = {
        name: error.name,
        message: error.message,
      };
      setError(customError);
      setIsLoading(false);
    });
  };

  return { isLoading, error, performFetch, cancelFetch };
};

export default useFetch;
