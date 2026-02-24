import React, { useEffect, useRef, useState } from 'react'

const useDebounce = (trigger, delay = 500) => {

    const [debouncedValue, setDebouncedValue] = useState([]);
    const timeout = useRef()

    useEffect(() => {

        clearTimeout(timeout.current)

        timeout.current = setTimeout(() => {
            setDebouncedValue(trigger());
        }, delay);

        return () => {
            clearTimeout(timeout.current)
        }

    }, [trigger, delay])

    return debouncedValue

}

export default useDebounce
