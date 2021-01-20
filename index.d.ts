declare module 'api-v1/a' {
  export const t: string;
}
declare module 'api-v1/b' {
  export const b: string;
}
declare module 'api-v1/index' {
  export const a: boolean;
  export const b: (a: boolean) => boolean;
}
declare module 'api-v1' {
  import main = require('api-v1/index');
  export = main;
}
