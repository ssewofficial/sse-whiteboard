import { Tldraw } from "tldraw";
import { useSyncDemo } from "@tldraw/sync";
import "tldraw/tldraw.css";
import { useParams } from "react-router-dom";

export default function Draw() {
  const { id } = useParams();
  if (!id) return;
  const store = useSyncDemo({ roomId: id });

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw store={store} />
    </div>
  );
}
