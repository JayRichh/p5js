import { useRef } from 'react'
import { useControls, folder, monitor } from 'leva'

export const SETTINGS = {

}

export function useLevaControls (props) {
  const frameRateRef = useRef(0)

  const data = useControls({
    'Main Settings': folder({
      Divisions: {
        value: 12,
        min: 2,
        max: 96,
        step: 1
      },
      'Debug Zone': folder({
        framerateMonitor: monitor(frameRateRef, { graph: true, interval: 60 }),
        framerate: monitor(frameRateRef, { graph: false, interval: 60 })
      })
    })
  }, [])

  return {
    data,
    frameRateRef
  }
}
