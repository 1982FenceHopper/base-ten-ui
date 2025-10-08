import { PauseIcon, PlayIcon } from "lucide-react";
import { type MouseEvent, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  updateAudioCurrentTime,
  updateAudioPlayback,
  updateAudioSeekFlag,
  updateAudioVolume,
} from "../../providers/state/media/MediaSliceProvider";
import type { RootStoreType } from "../../types/state/root-store";
import { cn } from "../../utils/ui/utils";
import UISlider from "../ui/slider";

export default function AudioControls() {
  const { playing, currentTime, totalDuration, volume } = useSelector(
    (state: RootStoreType) => {
      return {
        playing: state.mediaState.audio?.playing,
        currentTime: state.mediaState.audio?.currentTime,
        totalDuration: state.mediaState.audio?.totalDuration,
        volume: state.mediaState.audio?.volume,
      };
    },
    shallowEqual,
  );
  const dispatch = useDispatch();

  const [hovering, setHovering] = useState<boolean>(false);

  const handleSeekChange = (value: number | readonly number[]) => {
    const time = Number(value);
    dispatch(updateAudioSeekFlag(true));
    dispatch(updateAudioCurrentTime(time));
  };

  const handleVolumeChange = (value: number | readonly number[]) => {
    const volume = Number(value);
    dispatch(updateAudioVolume(volume / 100));
  };

  const togglePlayPause = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (
      playing === undefined ||
      currentTime === undefined ||
      totalDuration === undefined
    )
      return;
    if (!playing) {
      dispatch(updateAudioPlayback(true));
    } else {
      dispatch(updateAudioPlayback(false));
    }
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Element is not actively interactive, only hover states saved.
    <div
      id="audio_controls"
      className="my-auto flex flex-col mix-blend-difference"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="my-auto flex flex-row space-y-2 w-full">
        <p className="my-auto text-[12px] text-gray-600">Audio Controls</p>
        {playing !== undefined &&
          currentTime !== undefined &&
          totalDuration !== undefined &&
          volume !== undefined && (
            <UISlider
              value={volume * 100}
              onValueChange={handleVolumeChange}
              step={0.1}
              min={0}
              defaultValue={0}
              className={"my-auto max-w-4"}
              max={100}
              thumbRender={(props) => {
                return (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      opacity: hovering ? "1" : "0",
                      transition: "opacity 0.1s ease-in-out",
                    }}
                  />
                );
              }}
            />
          )}
      </div>
      {playing !== undefined &&
        currentTime !== undefined &&
        totalDuration !== undefined &&
        volume !== undefined && (
          <UISlider
            value={currentTime}
            onValueChange={handleSeekChange}
            step={0.1}
            min={0}
            max={totalDuration}
            defaultValue={0}
            className={"mx-auto"}
            thumbRender={(props) => {
              return (
                <button
                  type="button"
                  className={cn(props.className, "text-gray-200")}
                  onClick={togglePlayPause}
                  onPointerDown={(e) => e.stopPropagation()}
                  style={{
                    ...props.style,
                    opacity: hovering ? "1" : "0",
                    transition: "opacity 0.1s ease-in-out",
                  }}
                >
                  {playing ? (
                    <PauseIcon size={10} className="m-auto" />
                  ) : (
                    <PlayIcon size={10} className="m-auto" />
                  )}
                </button>
              );
            }}
          />
        )}
    </div>
  );
}
