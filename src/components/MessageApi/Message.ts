// eslint-disable-next-line @typescript-eslint/no-explicit-any
const W: any = window;
export const MsgSuccessHandler = (msg: string): void => {
  W.$message.success(msg);
};

export const MsgInfoHandler = (msg: string): void => {
  W.$message.info(msg);
};

export const MsgErrorHandler = (msg: string): void => {
  W.$message.error(msg);
};
