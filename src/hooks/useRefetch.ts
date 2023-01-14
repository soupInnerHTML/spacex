import useNetwork from "./useNetwork";
import {useEffect} from "react";
import {ApolloError} from "@apollo/client";

export default function useRefetch (error: ApolloError | undefined, callback: () => unknown) {
  const isOnline = useNetwork()

  useEffect(() => {
    if(isOnline && error) {
      callback()
    }
  }, [isOnline])
}
