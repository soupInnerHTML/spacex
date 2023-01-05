import React, {useEffect} from 'react';
import Lottie from 'react-lottie';
import * as loadingAnim from '../../assets/99297-loading-files.json'
import * as errorAnim from '../../assets/90569-error.json'
import {useGetPastLaunchesLazyQuery} from "./LaunchList.generated";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import delay from "../../utils/delay";
import {NetworkStatus} from "@apollo/client";
import useNetwork from "../../hooks/useNetwork";
import useRefetch from "../../hooks/useRefetch";

dayjs.extend(relativeTime)

const PLACEHOLDER = 'https://rocket-league.com/content/media/items/avatar/220px/5255eafbe61625506763.png'

const LaunchList: React.FC<{}> = () => {
  const [getData, {data, loading, refetch, error}] = useGetPastLaunchesLazyQuery({
    variables: {
      limit: 4
    },
  })

  useRefetch(error, refetch)

  useEffect(() => {
    const unsub = delay(500, getData)
    return () => unsub()
  }, [])

  return <div className={'launch-list'}>{
    data && data.launchesPast!.map(launch => {
      const {mission_name, links, launch_date_utc} = launch!;
      return <a
        href={links!.wikipedia ?? ''}
        target={'_blank'}
        rel="noreferrer"
        key={mission_name}
        className={'launch-item'}
      >
        <img
          height={150}
          width={150}
          src={links!.mission_patch_small ?? PLACEHOLDER}
          alt={''}
        />
        <p>{mission_name}</p>
        <p className={'launch-item__title'}>{dayjs(launch_date_utc).fromNow()}</p>
      </a>
    })
  }
  {(loading || !data) && <Lottie
    options={{
      loop: true,
      autoplay: true,
      animationData: loadingAnim
    }}
  />}
  </div>
};

export default LaunchList;
