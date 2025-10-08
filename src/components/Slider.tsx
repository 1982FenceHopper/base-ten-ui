import { useState } from 'react';
import UISlider from './ui/slider';

export default function Slider() {
  const [max, _setMax] = useState<number>(100);
  const [value, setValue] = useState<number>(0);

  const onValueChange = (value: number | readonly number[]) => {
    const val = Number(value);
    setValue(val);
  };

  return (
    <div className="flex flex-row space-x-14">
      <div className="flex flex-col space-y-2">
        <p>Slider (Normal)</p>
        <UISlider min={0} max={100} defaultValue={0} step={0.1} />
      </div>
      <div className="flex flex-col space-y-2">
        <p>Slider (Controlled)</p>
        <UISlider
          value={value}
          onValueChange={onValueChange}
          min={0}
          max={max}
          defaultValue={0}
          step={0.1}
        />
      </div>
    </div>
  );
}
