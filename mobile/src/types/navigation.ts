export type RootStackParamList = {
  Home: undefined;
  Shop: undefined;
  Search: undefined;
  Discover: undefined;
  Profile: undefined;
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 