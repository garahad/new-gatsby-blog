import { useState, useEffect, useRef } from 'react'
import _ from 'lodash'

import { CATEGORY_TYPE } from '../constants'
import * as ScrollManager from '../utils/scroll'
import * as Storage from '../utils/storage'
import * as IOManager from '../utils/visible'
import * as EventManager from '../utils/event-manager'
import * as Dom from '../utils/dom'

const BASE_LINE = 80

function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos
}

const useIndexHooks = ({ data, posts }) => {
  const initialCount = Storage.getCount(1)
  const initialCategory = Storage.getCategory(CATEGORY_TYPE.ALL)
  const [count, setCount] = useState(initialCount)
  const countRef = useRef(count)

  const { siteMetadata } = data.site
  const { countOfInitialPost } = siteMetadata.configs

  const isListPage = true

  useEffect(() => {
    window.addEventListener(`scroll`, onScroll, { passive: false })
    IOManager.init()
    ScrollManager.init()

    return () => {
      window.removeEventListener(`scroll`, onScroll, { passive: false })
      IOManager.destroy()
      ScrollManager.destroy()
    }
  }, [])

  useEffect(() => {
    countRef.current = count
    IOManager.refreshObserver()
    Storage.setCount(count)
    Storage.setCategory(initialCategory)
  })

  const onScroll = () => {
    const currentPos = window.scrollY + window.innerHeight
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE
    const doesNeedMore = () =>
      posts.length > countRef.current * countOfInitialPost

    return EventManager.toFit(() => setCount((prev) => prev + 1), {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore(),
    })()
  }

  return {
    isListPage,
    siteMetadata,
    countOfInitialPost,
    count,
    initialCategory,
  }
}

export default useIndexHooks
