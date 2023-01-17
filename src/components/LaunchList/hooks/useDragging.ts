import {MouseEventHandler, RefObject, useState} from "react";

type MouseEvent = MouseEventHandler<HTMLElement>


export default function useDragging(ref: RefObject<HTMLElement>, initialClassName: string) {
  const [isDragging, setIsDragging] = useState(false)

  const onMouseDown: MouseEvent = () => {
    setIsDragging(true)
  }

  const onMouseUp: MouseEvent = () => {
    setIsDragging(false)
  }

  const onMouseMove: MouseEvent = (e) => {
    const dragX = ref.current!.scrollLeft - e.movementX;
    if(isDragging && dragX > 0) {
      ref.current!.scrollLeft = dragX
    }
  }

  return {
    onMouseDown, onMouseUp, onMouseMove, className: `${initialClassName}${isDragging ? ' launch-list__wrapper_dragging' : ''}`
  }
}
