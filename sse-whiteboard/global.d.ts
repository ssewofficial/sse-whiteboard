interface Firebug {
  chrome: {
    isInitialized: boolean;
  };
}

declare global {
  interface Window {
    Firebug?: Firebug;
  }

  interface Console {
    firebug?: boolean;
    exception?: (message?: any) => void;
  }
}
