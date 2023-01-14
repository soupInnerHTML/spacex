import React, {useEffect, useRef} from 'react';
import {useGetPastLaunchesLazyQuery} from "./LaunchList.generated";
import useRefetch from "../../hooks/useRefetch";
import LaunchItem from "../LaunchItem/LaunchItem";
import Loader from "../Loader/Loader";
import useDragging from "./hooks/useDragging";
import useScrolling from "./hooks/useScrolling";


export const LAUNCH_LIST_LIMIT = 15

const LaunchList: React.FC<{}> = () => {
  const [getData, {data, loading, refetch, error, fetchMore}] = useGetPastLaunchesLazyQuery({
    variables: {
      limit: LAUNCH_LIST_LIMIT,
      offset: 0
    },
  })

  useRefetch(error, refetch)

  useEffect(() => {
    getData().then(() => console.log('🚀🚀🚀'))
  }, [])

  const ref = useRef<HTMLDivElement>(null)
  const dragging = useDragging(ref, `launch-list__wrapper`)
  const {isScrolledEver, ...scrolling} = useScrolling(ref, loading, () => {
    fetchMore({
      variables: {
        offset: data?.launchesPast?.length,
        limit: LAUNCH_LIST_LIMIT
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if(!fetchMoreResult) return prev;
        // @ts-ignore
        return {...prev, launchesPast: [...prev.launchesPast, ...fetchMoreResult.launchesPast]}
      }
    })
  })

  // console.log('render')

  return <div className={'launch-list'}>
    <div ref={ref} {...dragging} {...scrolling}>
      {data && data.launchesPast!.map(launch => <LaunchItem key={launch!.mission_name} {...launch} />)
    }
    </div>
    <Loader loading={loading || !data} />
  </div>
};

export default LaunchList;
