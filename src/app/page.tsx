"use client";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import Layout from "@/components/Layout";

const HomePage = () => {
  const router = useRouter();

  return (
    <Layout confirmText="확인" cancelText="취소">
      <Button color="white" block onClick={() => router.push("/pages/test")}>
        컴포넌트
      </Button>
    </Layout>
  );
};

export default HomePage;
