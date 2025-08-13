import { useState } from 'react';
import UIButton from './ui/button';
import { UIBasicDialog, UIControlledDialog } from './ui/dialog';

export default function Dialog() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-row space-x-14">
      <div className="flex flex-col space-y-2">
        <p>Dialog (Uncontrolled)</p>
        <UIBasicDialog
          trigger={<UIButton>Dialog</UIButton>}
          description="This is an uncontrolled dialog"
        >
          Uncontrolled Dialog
        </UIBasicDialog>
      </div>
      <div className="flex flex-col space-y-2">
        <p>Dialog (Controlled)</p>
        <UIButton
          onClick={() => {
            setOpen(true);
          }}
        >
          Dialog
        </UIButton>
        <UIControlledDialog
          open={open}
          onOpenChange={setOpen}
          description="This is a controlled dialog"
        >
          Controlled Dialog
        </UIControlledDialog>
      </div>
    </div>
  );
}
