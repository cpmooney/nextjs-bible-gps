import { CardStateProvider } from "./components/home/card-state-provider";
import Content from "./components/home/content";
import ResponseButtons from "./components/home/response-buttons";
import Score from "./components/home/score";

export default function Home() {
  return (
    <CardStateProvider>
      <div className="p-4">
      <div className="w-full max-w-2xl bg-base-100 shadow-xl mb-4 p-4">
        <label className="label font-bold uppercase">Grade Yourself</label>
        <div className="card-actions">
          <ResponseButtons />
        </div>
      </div>
      <div className="w-full max-w-2xl bg-base-100 shadow-xl mb-4 p-4">
        <label className="label font-bold uppercase">Text</label>
        <Content />
      </div>
      <div className="w-full max-w-2xl bg-base-100 shadow-xl mb-4 p-4">
        <Score />
      </div>
      </div>
    </CardStateProvider>
  );
}
