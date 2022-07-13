import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    block: string;
    hoveredText: string;
    hoveredBg: string;
    accent: string;
    text: string;
  }
}
