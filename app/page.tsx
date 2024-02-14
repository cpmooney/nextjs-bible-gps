import CitationDetails from "./components/citation-details";
import {CardStateProvider} from "./components/home/card-state-provider";
import Content from "./components/home/content";
import ResponseButtons from "./components/home/response-buttons";
import InfoButton from "./components/info-button";
import Label from "./components/label";

export default function Home() {
  return (
    <CardStateProvider>
      <div className="bg-off-white-1 mt-1 p-4">
        <Label title="Guess the citation for this passage" />
        <Content />
      </div>
      <div className="bg-off-white-1 mt-1 p-4">
        <Label title="How did you do?" />
        <ResponseButtons />
      </div>
      <div className="bg-off-white-1 mt-1 p-4">
        <Label title="Deets on this citation" />
        <div className="mt-2">
          <CitationDetails />
          <InfoButton />
        </div>
      </div>
    </CardStateProvider>
  );
}
