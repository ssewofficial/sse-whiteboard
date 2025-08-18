import {
  AssetRecordType,
  getHashForString,
  type TLAssetStore,
  type TLBookmarkAsset,
  Tldraw,
  uniqueId,
} from "tldraw";
import { useSync } from "@tldraw/sync";
import "tldraw/tldraw.css";
import { useParams } from "react-router-dom";

const WORKER_URL = `http://localhost:5858`;

export default function Draw() {
  const { roomId } = useParams();
  if (!roomId) return;
  // Create a store connected to multiplayer.
  const store = useSync({
    // We need to know the websocket's URI...
    uri: `${WORKER_URL}/connect/${roomId}`,
    // ...and how to handle static assets like images & videos
    assets: multiplayerAssets,
  });

  document.title === "Draw | SSE Whiteboard" 

  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw
        store={store}
        onMount={(editor) => {
          // @ts-expect-error
          window.editor = editor;
          editor.registerExternalAssetHandler("url", unfurlBookmarkUrl);
        }}
      />
    </div>
  );
}

// How does our server handle assets like images and videos?
const multiplayerAssets: TLAssetStore = {
  // to upload an asset, we prefix it with a unique id, POST it to our worker, and return the URL
  async upload(_asset, file) {
    const id = uniqueId();

    const objectName = `${id}-${file.name}`;
    const url = `${WORKER_URL}/uploads/${encodeURIComponent(objectName)}`;

    const response = await fetch(url, {
      method: "PUT",
      body: file,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload asset: ${response.statusText}`);
    }

    return { src: url };
  },
  // to retrieve an asset, we can just use the same URL. you could customize this to add extra
  // auth, or to serve optimized versions / sizes of the asset.
  resolve(asset) {
    return asset.props.src;
  },
};

// How does our server handle bookmark unfurling?
async function unfurlBookmarkUrl({
  url,
}: {
  url: string;
}): Promise<TLBookmarkAsset> {
  const asset: TLBookmarkAsset = {
    id: AssetRecordType.createId(getHashForString(url)),
    typeName: "asset",
    type: "bookmark",
    meta: {},
    props: {
      src: url,
      description: "",
      image: "",
      favicon: "",
      title: "",
    },
  };

  try {
    const response = await fetch(
      `${WORKER_URL}/unfurl?url=${encodeURIComponent(url)}`
    );
    const data = await response.json();

    asset.props.description = data?.description ?? "";
    asset.props.image = data?.image ?? "";
    asset.props.favicon = data?.favicon ?? "";
    asset.props.title = data?.title ?? "";
  } catch (e) {
    console.error(e);
  }

  return asset;
}
