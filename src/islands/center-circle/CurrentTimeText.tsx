import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

export const CurrentTimeText: FunctionalComponent = () => {
  const [time, setTime] = useState<string>(formatNow());

  useEffect(() => {
    const job = setInterval(() => {
      setTime(formatNow());
    }, 1000);

    return () => {
      clearInterval(job);
    };
  }, []);

  return <>{time}</>;
};

function formatNow() {
  const now = new Date();
  const hour = now.getHours().toString(10).padStart(2, "0");
  const min = now.getMinutes().toString(10).padStart(2, "0");
  const sec = now.getSeconds().toString(10).padStart(2, "0");

  return `${hour}時${min}分${sec}秒`;
}
