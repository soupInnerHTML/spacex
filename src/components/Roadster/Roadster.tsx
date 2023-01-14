import React from 'react';
import {useGetRoadsterInfoQuery} from "./Roadster.generated";
import round from "../../utils/round";
import useRefetch from "../../hooks/useRefetch";
import Skeleton from "../Skeleton/Skeleton";

const Roadster: React.FC = () => {
  const {data, error, refetch} = useGetRoadsterInfoQuery({
    pollInterval: 60_000 //update every
  });

  useRefetch(error, refetch)

  return (
    <div className={'roadster'}>
      <React.Fragment>
        <span className={'roadster__item'}>2022.</span>
        <span className={'roadster__item'}>
          {data?.roadster?.name ?? <Skeleton width={100} />}.
        </span>
        <span className={'roadster__item'}>
          {round(data?.roadster?.speed_kph) || <Skeleton width={50} />} km per hour.
        </span>

        <br/>

        <span className={'roadster__item'}>
          {round(data?.roadster?.earth_distance_km) || <Skeleton width={50} />} km from earth.
        </span>
        <span className={'roadster__item'}>
          {round(data?.roadster?.mars_distance_km) || <Skeleton width={50} />} km to mars.
        </span>
      </React.Fragment>
    </div>
  );
};

export default Roadster;
