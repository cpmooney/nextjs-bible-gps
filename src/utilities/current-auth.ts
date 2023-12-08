let userId: string | undefined;;

export const usingUser = (myUserId: string) => {
    userId = myUserId;
}

export const obtainGuaranteedUserId = () => {
    if (!userId) {
        throw new Error("No user id available");
    }
    return userId;
}

export const obtainUserId = () => {
    return userId;
}
