import { useUserPreferenceContext } from "../providers/user-preference-provider";

interface Props {
    children: React.ReactNode;
}

export function Beta({ children }: Props) {
  const { betaFeatures } = useUserPreferenceContext();
  return betaFeatures ? children : null;
}