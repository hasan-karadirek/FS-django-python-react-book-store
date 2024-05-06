import { useState } from "react";

/**
 * TypeScript types for the response and the options used in fetch.
 */
interface FetchOptions extends RequestInit {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

interface FetchResponse {
  success: boolean;
  msg?: string;
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
    throw new Error("When using the useFetch hook, the route should not include the /api/ part");
  }

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const performFetch = (options?: FetchOptions) => {
    setError(null);
    setIsLoading(true);

    const baseOptions: FetchOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const fetchData = async () => {
      // We add the /api subsection here to make it a single point of change if our configuration changes
      const url = `http://localhost:8000/api${route}`;

      const res = await fetch(url, { ...baseOptions, ...options, signal });

      if (!res.ok) {
        setError(new Error(`Fetch for ${url} returned an invalid status (${res.status}). Received: ${JSON.stringify(res)}`));
        setIsLoading(false);
        return;
      }

      const jsonResult: FetchResponse = await res.json();

      if (jsonResult.success === true) {
        onReceived(jsonResult);
      } else {
        setError(new Error(jsonResult.msg || `The result from our API did not have an error message. Received: ${JSON.stringify(jsonResult)}`));
      }

      setIsLoading(false);
    };

    fetchData().catch((error: Error) => {
      setError(error);
      setIsLoading(false);
    });
  };

  return { isLoading, error, performFetch, cancelFetch };
};

export default useFetch;
