import { CardStateProvider } from "./components/home/card-state-provider";
import Content from "./components/home/content";
import InfoButton from "./components/home/info-button";
import ResponseButtons from "./components/home/response-buttons";
import Label from "./components/label";

export default function Home() {
  return (
    <CardStateProvider>
      <div className="p-4">
        <div className="w-full max-w-2xl bg-white shadow-xl mb-4 p-4">
          <Label title="Guess the citation for this passage" />
          <Content />
        </div>
        <div className="w-full max-w-2xl bg-white shadow-xl mb-4 p-4">
          <Label title="How did you do?" />
          <ResponseButtons />
        </div>
        <div className="w-full max-w-2xl bg-white shadow-xl mb-4 p-4 hidden">
          <div className="mt-2">
            <InfoButton />
          </div>
        </div>
      </div>
    </CardStateProvider>
  );
}
