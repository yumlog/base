"use client";

import React, { useRef, useState } from "react";

import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import NotFound from "@/components/NotFound";
import Skeleton from "@/components/Skeleton";
import Switch from "@/components/Switch";
import Tabs from "@/components/Tabs";
import TextField from "@/components/TextField";
import Title from "@/components/Title";
import type { ToastHandle } from "@/components/Toast";
import Toast from "@/components/Toast";
import Tooltip from "@/components/Tooltip";

const TestPage = () => {
  const toastRef = useRef<ToastHandle>(null);
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
      <div style={{ height: 80 }} />

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
        <Title title="NotFound" />
        <NotFound
          lottieType="lottie1"
          title="찾을 수 없어요"
          description="다시 검색을 해볼까 말까"
          btnText="다시하기"
        />
      </section>

      <section>
        <Title title="Skeleton" />
        <Skeleton
          block
          loading={
            <>
              <span>⏩로딩중</span>
            </>
          }
          content={
            <>
              <span>✅로딩완료</span>
            </>
          }
        />
      </section>

      <section>
        <Title title="Switch" />
        <div className="flex">
          <Switch />
        </div>
      </section>

      <section className="inline">
        <Title title="Tabs" />
        <Tabs
          tabType="underbar"
          tabTitles={["탭1", "탭2", "탭3"]}
          tabContents={["탭1 컨텐츠", "탭2 컨텐츠", "탭3 컨텐츠"]}
        />
        <Tabs
          tabType="block"
          tabTitles={["탭1", "탭2"]}
          tabContents={["탭1 컨텐츠", "탭2 컨텐츠"]}
        />
        <Tabs
          tabType="chip"
          tabTitles={["탭1", "탭2", "탭3"]}
          tabContents={["탭1 컨텐츠", "탭2 컨텐츠", "탭3 컨텐츠"]}
        />
      </section>

      <section>
        <Title title="TextField" />
        <TextField
          label="라벨"
          placeholder="입력하세요"
          errorMessage="입력하면 안돼요!"
        />
      </section>

      <section>
        <Title title="Toast" />
        <span onClick={() => toastRef.current?.show()}>
          클릭하면 토스트가 떠요
        </span>
        <Toast ref={toastRef} small>
          토스트를 구웠어요
        </Toast>
      </section>

      <section>
        <Title title="Tooltip" />
        <Tooltip content="이렇게 뜬답니다 둥둥" floating>
          클릭하면 툴팁이 떠요
        </Tooltip>
      </section>

      <div style={{ height: 100 }} />

      {fullDialog}
      {bottomSheet}
    </>
  );
};

export default TestPage;
