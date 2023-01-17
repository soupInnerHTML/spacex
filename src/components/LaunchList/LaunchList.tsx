import React, {useEffect, useRef} from 'react';
import {useGetPastLaunchesLazyQuery} from "./LaunchList.generated";
import useRefetch from "../../hooks/useRefetch";
import {LaunchItem} from "../LaunchItem/LaunchItem";
import Loader from "../Loader/Loader";
import useDragging from "./hooks/useDragging";
import useScrolling from "./hooks/useScrolling";
import {NetworkStatus} from "@apollo/client";

export const LAUNCH_LIST_LIMIT = 15
const PLACEHOLDER_ARRAY = Array.from({length: LAUNCH_LIST_LIMIT}, (_, key) => <LaunchItem.Placeholder key={key}/>)

const LaunchList: React.FC = () => {
  const [getData, {data, loading, refetch, error, fetchMore, networkStatus}] = useGetPastLaunchesLazyQuery({
    variables: {
      limit: LAUNCH_LIST_LIMIT,
      offset: 0
    },
    notifyOnNetworkStatusChange: true,
  })

  useRefetch(error, refetch)

  useEffect(() => {
    getData().then(() => console.log('🚀🚀🚀'))
  }, [])

  const ref = useRef<HTMLDivElement>(null)
  const dragging = useDragging(ref, `launch-list__wrapper`)
  const isReachedMax = useRef(false);
  const {isScrolledEver, offset, ...scrolling} = useScrolling(ref, loading, () => {
    if(!isReachedMax.current) {
      const variables = {
        offset: data?.launchesPast?.length,
        limit: LAUNCH_LIST_LIMIT
      }
      if(variables.offset !== offset.current) {
        fetchMore({
          variables,
          updateQuery: (prev, {fetchMoreResult}) => {
            if (!fetchMoreResult) return prev;
            if (!fetchMoreResult.launchesPast?.length) {
              isReachedMax.current = true;
            }
            return {...prev, launchesPast: [...prev.launchesPast!, ...fetchMoreResult.launchesPast!]}
          }
        })
        offset.current = variables.offset ?? 0;
      }
    }
  })

  return <div className={'launch-list'}>
    <div ref={ref} {...dragging} {...scrolling}>
      {data && data.launchesPast!.map(launch => <LaunchItem key={launch!.mission_name} {...launch} />)}
      {networkStatus === NetworkStatus.fetchMore && PLACEHOLDER_ARRAY}
    </div>
    <Loader loading={networkStatus === NetworkStatus.loading || !data} />
  </div>
};

export default LaunchList;
