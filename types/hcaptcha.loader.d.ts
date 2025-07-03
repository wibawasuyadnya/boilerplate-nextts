declare module "@hcaptcha/loader" {
    export interface LoaderOptions {
      // (Optional) Add any options if needed
    }
  
    /**
     * Loads the hCaptcha script.
     * Returns a Promise that resolves when the script has loaded.
     */
    export function hCaptchaLoader(options?: LoaderOptions): Promise<void>;
  }
  