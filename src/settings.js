import { useRef } from 'react'
import { useControls, folder, monitor } from 'leva'

export const SETTINGS = {
  MODE: ['Images', 'Typography'],
  DIRECTIONS: ['Horizontal', 'Vertical'],
  MAX_INSTANCES: 8
}

export function useLevaControls (props) {
  const frameRateRef = useRef(0)

  const data = useControls({
    'Main Settings': folder({
      Mode: {
        options: SETTINGS.MODE
      },
      Direction: {
        options: SETTINGS.DIRECTIONS
      },
      Instances: {
        value: 4,
        min: 2,
        max: SETTINGS.MAX_INSTANCES,
        step: 1
      },
      Resolution: folder({
        Divisions: {
          value: 12,
          min: 2,
          max: 96,
          step: 1
        },
        Resolution: {
          value: 100,
          min: 1,
          max: 100,
          step: 5
        }
      }),
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
