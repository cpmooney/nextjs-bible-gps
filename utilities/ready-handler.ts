let handleDeckIsReady: () => void;

export const usingDeckIsReadySetter = (handler: () => void) => {
  handleDeckIsReady = handler;
}

export const declareDeckIsReady = () => {
    if (!handleDeckIsReady) {
        throw new Error("declareDeckIsReady: handleDeckIsReady is undefined");
    }
    handleDeckIsReady();
}