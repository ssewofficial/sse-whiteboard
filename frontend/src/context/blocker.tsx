import React from "react";

interface SecurityProps extends React.PropsWithChildren {
  blockContextMenu?: boolean;
  blockDevTools?: boolean;
  blockKeyboardShortcuts?: boolean;
  blockDebugger?: boolean;
  monitorNetwork?: boolean;
  customDevToolsMessage?: {
    title?: string;
    description?: string;
    style?: React.CSSProperties;
  };
}

const SecuritySetting = ({
  children,
  blockContextMenu = true,
  blockDevTools = true,
  blockKeyboardShortcuts = true,
  blockDebugger = true,
  monitorNetwork = false,
  customDevToolsMessage,
}: SecurityProps) => {
  // Block right-click context menu
  React.useEffect(() => {
    if (!blockContextMenu) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [blockContextMenu]);

  // Detect and block developer tools
  React.useEffect(() => {
    if (!blockDevTools) return;

    const checkDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;

      if (
        !(heightThreshold && widthThreshold) &&
        ((window.Firebug &&
          window.Firebug.chrome &&
          window.Firebug.chrome.isInitialized) ||
          widthThreshold ||
          heightThreshold ||
          (typeof console !== "undefined" && console.firebug !== undefined) ||
          (typeof console !== "undefined" && console.exception !== undefined))
      ) {
        const defaultStyle: React.CSSProperties = {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          fontFamily: "sans-serif",
        };

        document.body.innerHTML = `
          <div style="${Object.entries(
            customDevToolsMessage?.style || defaultStyle
          )
            .map(([key, value]) => `${key}:${value};`)
            .join("")}">
            <div style="text-align:center">
              <h1 style="font-size:2rem;margin-bottom:1rem">
                ${customDevToolsMessage?.title || "Developer Tools Detected"}
              </h1>
              <p style="font-size:1rem">
                ${
                  customDevToolsMessage?.description ||
                  "This application has disabled developer tools mode"
                }
              </p>
            </div>
          </div>
        `;
        throw new Error("Developer tools detected");
      }
    };

    const interval = setInterval(checkDevTools, 1000);
    return () => clearInterval(interval);
  }, [blockDevTools, customDevToolsMessage]);

  // Block keyboard shortcuts
  React.useEffect(() => {
    if (!blockKeyboardShortcuts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const blockedShortcuts = [
        "F12",
        ...(e.ctrlKey && e.shiftKey ? ["I", "J", "C"] : []),
        ...(e.ctrlKey ? ["U"] : []),
      ];

      if (blockedShortcuts.includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [blockKeyboardShortcuts]);

  // Prevent debugging
  React.useEffect(() => {
    if (!blockDebugger) return;

    const debuggerProtection = setInterval(() => {
      (function () {});
      // eslint-disable-next-line no-debugger
      debugger;
    }, 100);

    return () => clearInterval(debuggerProtection);
  }, [blockDebugger]);

  // Monitor network requests
  React.useEffect(() => {
    if (!monitorNetwork) return;

    const originalFetch = window.fetch;
    window.fetch = async function (
      ...args: Parameters<typeof fetch>
    ): ReturnType<typeof fetch> {
      try {
        return await originalFetch.apply(this, args);
      } catch (error) {
        console.error("Fetch failed:", error);
        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [monitorNetwork]);

  return <>{children}</>;
};

export default SecuritySetting;
