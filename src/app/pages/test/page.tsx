"use client";

import React, { useState } from "react";

import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import Title from "@/components/Title";
import Tooltip from "@/components/Tooltip";

const TestPage = () => {
  const [fullOpen, setFullOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);

  const fullDialog = (
    <Dialog
      type="fullscreen"
      title="풀스크린"
      nopt
      isOpen={fullOpen}
      onClose={() => setFullOpen(false)}
    >
      풀스크린입니당~
    </Dialog>
  );

  const bottomSheet = (
    <Dialog
      title="바텀시트"
      isOpen={bottomOpen}
      onCancel={() => setBottomOpen(false)}
      onClose={() => setBottomOpen(false)}
      cancelText="나가기"
      confirmText="추가하기"
      zIndex={1010}
    >
      바텀시트입니당~
    </Dialog>
  );

  return (
    <>
      <section>
        <Title title="Button" />
        <div className="flex flex-col gap-y-2">
          <Button size="small" color="fill">
            small
          </Button>
          <Button size="medium" color="outline">
            medium
          </Button>
          <Button size="large" color="white">
            large
          </Button>
        </div>
      </section>

      <section>
        <Title title="Dialog" />
        <div className="flex flex-col gap-y-2">
          <span onClick={() => setFullOpen(true)}>
            클릭하면 풀스크린 팝업이 떠요
          </span>
          <span onClick={() => setBottomOpen(true)}>
            클릭하면 바텀시트가 떠요
          </span>
        </div>
      </section>

      <section>
        <Title title="Tooltip" />
        <Tooltip content="이렇게 뜬답니다 둥둥" floating>
          클릭하면 툴팁이 떠요
        </Tooltip>
      </section>

      {fullDialog}
      {bottomSheet}
    </>
  );
};

export default TestPage;
