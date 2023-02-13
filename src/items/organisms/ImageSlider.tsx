import { useState, useMemo, useRef } from 'react'
import { useOnClickOutside, useInterval, useEventListener } from 'usehooks-ts'


import { STATIC_IMAGE_BASE } from '@/scripts/constants/api'
import CSS from '@/styles/modules/Slider.module.css'
export const ImageSlider = ({
    GW, filteredFileList, loadedImages, loadedImages_do,
    isClicking, s__isClicking,
    pageOffset, s__pageOffset
})=>{
    const [swipeOffset, s__swipeOffset] = useState(0);
    const _isTouch = process.browser && window.ontouchstart !== undefined;
    const $touchPad = useRef<any>()
    const [firstTouch, s__firstTouch] = useState(0);
    const [liveOffset, s__liveOffset] = useState(0);
    const [count, setCount] = useState<number>(0)
    const [isPlaying, setPlaying] = useState<boolean>(true)
    const [delay, setDelay] = useState<number>(10)
    const minDifference = 50
    const lerpSpeed = 50
    // const handleClick = ()=>{
    //     $childRef.current.childFunction1();

    //     $childRef.current.childFunction2();
    // };
    const targetOffset = useMemo(()=>{
        return pageOffset + swipeOffset
    }, [pageOffset,swipeOffset])

    useInterval(
        ()=>{
            setCount(count + 1)
            if (liveOffset == targetOffset) return
            let theDifference = Math.abs(liveOffset - targetOffset)
            if (theDifference < minDifference) return s__liveOffset(targetOffset)
            if (theDifference > 1200) return s__liveOffset(targetOffset)
            if (liveOffset < targetOffset ) return s__liveOffset(liveOffset+ lerpSpeed)
            if (liveOffset > targetOffset ) return s__liveOffset(liveOffset- lerpSpeed)

        },
        isPlaying ? delay : null,
      )
    const onDrag = (e)=>{
        if (isClicking)
        {
            s__swipeOffset(parseInt(((e.offsetX-firstTouch) * 1.68).toString()))
        }
    }

    const onStartClick = (e)=>{s__isClicking(true); s__firstTouch(e.offsetX) }
    const setNextPage = ()=>{
        if (pageOffset > -GW*(filteredFileList.length-1)) {s__pageOffset(pageOffset-GW) }
    }
    const setPrevPage = ()=>{if (pageOffset < 0) {s__pageOffset(pageOffset+GW) } }
    const onEndClick = (e)=>{
        s__isClicking(false)
        s__swipeOffset(0)
        if (filteredFileList.length < 2) return
        if (swipeOffset < -200 ) {setNextPage() }
        if (swipeOffset > 200 ) {setPrevPage() }
    }
    useEventListener(_isTouch ? "touchmove" : "mousemove", onDrag, $touchPad)
    useEventListener(_isTouch ? "touchstart" : "mousedown", onStartClick, $touchPad)
    useEventListener(_isTouch ? "touchend" : "mouseup", onEndClick, $touchPad)
    useEventListener("mouseleave", (e)=>{
        onEndClick(e)
    }, $touchPad)
    useOnClickOutside($touchPad, ()=>{ s__swipeOffset(0) })


    return (
    <div className={` noverflow bord-r-8 ${CSS["carousel-container"]}`}>
        <div ref={$touchPad}
            className={`${CSS["touch-pad"]} grab w-100 bord-r-10 h-100 noselect pos-abs`}
        >
        </div>
        <div className="none top-0 right-0 pos-abs"  > off:{swipeOffset} </div>
        <div className={'flex  noclick ${CSS["carousel-height"]} '} >
            {filteredFileList.map((item,index)=>{
            return (
                <div  key={index} 
                    style={{transform:`translateX(${liveOffset}px)`}}
                    className={`flex-center ${CSS["carousel-width"]} `}
                >
                    {!loadedImages.has(index) && (
                        <div
                            className={
                                " bg-white ims-border-faded pos-abs "+
                                " w-100 h-100 flex-center opaci-50 tx-ls-5 "
                            }
                            style={{width:GW+"px"}}
                        >
                            <span className="hover-2"> loading... </span>
                        </div>
                    )}
                    <div style={{width:GW+"px",minWidth:GW+"px",aspectRatio:"cover"}}>
                        <img className="w-100 noclick" alt=""
                            style={{objectFit:"cover",height:GW/1.5+"px"}}
                            onLoad={()=>{loadedImages_do.set(index,true)}} 
                            src={`${STATIC_IMAGE_BASE}000000${item}`}  
                        />
                    </div>
                </div>
            )})}
        </div>
    </div>
    )
}