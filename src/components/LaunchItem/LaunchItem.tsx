import React from 'react';
import placeholder from "../../assets/img/placeholder.webp";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {LaunchItemFragment} from "./LaunchItem.generated";
import ContentLoader from "react-content-loader";
import Skeleton from "../Skeleton/Skeleton";

dayjs.extend(relativeTime)

const LaunchItemInner: React.FC<LaunchItemFragment> = ({mission_name, links, launch_date_utc}) => {
  return <div className={'launch-item'}>
    <img
      className={'launch-item__logo'}
      src={links!.mission_patch_small ?? placeholder}
      alt={''}
    />
    <a
      href={links!.video_link ?? 'https://www.spacex.com/'}
      target={'_blank'}
      rel="noreferrer"
      draggable={false}
      className={'launch-item__mission-name'}>{mission_name}</a>
    <p className={'launch-item__title'}>{dayjs(launch_date_utc).fromNow()}</p>
  </div>
};

const LaunchItem: React.NamedExoticComponent<LaunchItemFragment> & {Placeholder?: React.FC} = React.memo(LaunchItemInner)

LaunchItem.Placeholder = () => {
  return <div className={'launch-item'}>
    <ContentLoader
      className={'launch-item__logo'}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="150" ry="150" width={150} height={150} />
    </ContentLoader>
    <Skeleton width={130} height={16} />
    <Skeleton width={100} height={12} />

  </div>
}

export {LaunchItem};
