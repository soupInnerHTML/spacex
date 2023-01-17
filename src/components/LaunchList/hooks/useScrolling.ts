import {RefObject, UIEventHandler, useEffect, useRef, useState, WheelEventHandler} from "react";
import delay from "../../../utils/delay/delay";
import {LAUNCH_LIST_LIMIT} from "../LaunchList";

export default function useScrolling(ref: RefObject<HTMLElement>, loading: boolean, infiniteScrollEffect: () => unknown) {
  const [isScrolledEver, setIsScrolledEver] = useState(false)
  const offset = useRef(0)

  useEffect( () => {
    //ux showing of row scroll
    const row = ref.current;
    if(!loading && !isScrolledEver) {
      let promise = delay(1000, () => {
          if (row && row.scrollLeft === 0) {
            row.scrollTo({
              left: row.scrollWidth / LAUNCH_LIST_LIMIT,
              behavior: 'smooth'
            })

            delay(500, () => {
              row && row.scrollTo({
                left: 0,
                behavior: 'smooth'
              })
            })

            console.log('using ux scroll effect in useScrolling hook 🔥')
          }
        })


      return () => {
        promise.cancel()
        console.log('cleanup')
      }
    }
  }, [loading, isScrolledEver])

  const onScroll: UIEventHandler<HTMLElement> = () => {
    if(!isScrolledEver) {
      setIsScrolledEver(true)
    }

    const _row = ref.current;
    if(_row && _row.scrollWidth === _row.scrollLeft + _row.clientWidth) {
      infiniteScrollEffect()
    }
  }

  const onWheel: WheelEventHandler = (e) => {
    if(ref.current) {
      const scrollX = ref.current.scrollLeft + e.deltaY
      if(scrollX > 0) {
        ref.current.scrollLeft = scrollX
      }
    }
  }

  return {onScroll, onWheel, isScrolledEver, offset}
}
