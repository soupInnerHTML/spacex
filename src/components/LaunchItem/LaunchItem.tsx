import React from 'react';
import placeholder from "../../assets/img/placeholder.webp";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {LaunchItemFragment} from "./LaunchItem.generated";

dayjs.extend(relativeTime)

const LaunchItem: React.FC<LaunchItemFragment> = ({mission_name, links, launch_date_utc}) => {
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

export default React.memo(LaunchItem);
