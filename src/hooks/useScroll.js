import {useEffect, useRef} from "react";

const useScroll = (parentRef, childRef, callback) => {

  const observer = useRef();
  console.log(parentRef, childRef, callback, 'parentRef, childRef, callback')

  useEffect(() => {
    if(!childRef) return null;
    const options = {
      root: parentRef.current,
      rootMargin: '0px',
      threshold: 0
    };
    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        console.log('intersected')
        callback()
      }
    }, options);

    observer.current.observe(childRef.current);

    return function () {
      childRef.current && observer.current?.unobserve(childRef.current)
    };
  }, [callback])
};

export default useScroll;