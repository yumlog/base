"use client";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";

const HomePage = () => {
  const router = useRouter();

  return (
    <div>
      <Button color="white" block onClick={() => router.push("/pages/test")}>
        컴포넌트
      </Button>
    </div>
  );
};

export default HomePage;
