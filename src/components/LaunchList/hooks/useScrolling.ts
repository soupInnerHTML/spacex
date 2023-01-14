import React, {RefObject, useEffect, useState} from "react";
import delay from "../../../utils/delay";
import {LAUNCH_LIST_LIMIT} from "../LaunchList";

export default function useScrolling(ref: RefObject<HTMLElement>, loading: boolean, infiniteScrollEffect: () => void) {
  const [isScrolledEver, setIsScrolledEver] = useState(false)

  useEffect(() => {
    //ux showing of row scroll
    const row = ref.current;
    if(!loading && !isScrolledEver) {
      const unsub = delay(1000, () => {
        if (row && row.scrollLeft === 0) {
          row.scrollLeft = row.scrollWidth / LAUNCH_LIST_LIMIT

          delay(500, () => {
            row && (row.scrollLeft = 0)
          })

          console.log('using ux scroll effect in useScrolling hook 🔥')
        }
      })

      return () => unsub()
    }
  }, [loading, isScrolledEver])

  const onScroll: React.UIEventHandler<HTMLDivElement> = async () => {
    if(!isScrolledEver) {
      setIsScrolledEver(true)
    }

    const _row = ref.current;
    if(_row && _row.scrollWidth === _row.scrollLeft + _row.clientWidth) {
      infiniteScrollEffect()
    }
  }

  return {onScroll, isScrolledEver}
}
