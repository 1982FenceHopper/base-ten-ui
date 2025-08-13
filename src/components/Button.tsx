import UIButton from './ui/button';

export default function Button() {
  return (
    <div className="flex flex-row space-x-14">
      <div className="flex flex-col space-y-2">
        <p>Button (Normal)</p>
        <UIButton>Button</UIButton>
      </div>
      <div className="flex flex-col space-y-2">
        <p>Button (Normal, Rounded)</p>
        <UIButton rounded>Button</UIButton>
      </div>
      <div className="flex flex-col space-y-2">
        <p>Button (Ghost)</p>
        <UIButton intent={'ghost'}>Button</UIButton>
      </div>
      <div className="flex flex-col space-y-2">
        <p>Button (Ghost, Rounded)</p>
        <UIButton intent={'ghost'} rounded>
          Button
        </UIButton>
      </div>
      <div className="flex flex-col space-y-2">
        <p>Button (Destructive)</p>
        <UIButton intent={'destructive'}>Button</UIButton>
      </div>
      <div className="flex flex-col space-y-2">
        <p>Button (Destructive, Rounded)</p>
        <UIButton intent={'destructive'} rounded>
          Button
        </UIButton>
      </div>
    </div>
  );
}
