export type ApiResponse =
  | {
      success: true;
      message: string;
      data: any;
    }
  | {
      success: false;
      validationErrors?: Record<string, string> | undefined;
      error?: any | undefined;
      message: string;
    };
