import pkg from "../package.json";

/**
 * Wraps window.location.assign()
 */
export const windowLocationAssign = (url: string) => {
    window.location.assign(url);
};

/**
 * Get the url for the session./yarn-error.log
.DS_Store
 */
export interface SessionUrlOptions {
    sid: string;
    endpoint: string;
    language: string | undefined;
    ui?: "fullscreen" | "inline";
    shouldCallValidateSession: boolean;
}

export const getSessionUrl = (options: SessionUrlOptions): string => {
    const { sid, endpoint, language, ui, shouldCallValidateSession } = options;
    if (!endpoint) {
        throw new Error("Invalid endpoint");
    }

    // Compose url for view session endpoint with optional language parameter.
    let languageParam = language ? `language=${language}` : "";
    let uiParam = ui ? `ui=${ui}` : "";
    let sdk = `sdk=${pkg.version}`;
    let validate = shouldCallValidateSession ? `client_side_validation=true` : undefined;
    const params = [languageParam, uiParam, sdk, validate].filter(x => x).join("&");
    return `${endpoint}/v1/view/${sid}${params ? "?" + params : ""}`;
};
