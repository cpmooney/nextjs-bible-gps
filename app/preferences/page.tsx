import Label from "app/components/label";
import { useUserPreferenceContext } from "app/components/providers/user-preference-provider";

export default function Preferences() {
    const {
        obtainAdvancedView,
        obtainPromptDisplay,
        obtainManualSave,
        setAdvancedView,
        setPromptDisplay,
        setManualSave
    } = useUserPreferenceContext();
  return (
    <div className="bg-off-white-1 mt-1 p-4">
      <Label title="Preferences" />
      <div className="mt-2">
        Advanced view: <input type="checkbox" checked={obtainAdvancedView()} onChange={(e) => setAdvancedView(e.target.checked)} />  
        Manual save: <input type="checkbox" checked={obtainManualSave()} onChange={(e) => setManualSave(e.target.checked)} />
        Prompt type: <select value={obtainPromptDisplay()} onChange={(e) => setPromptDisplay(e.target.value as any)}>
            <option value="entire-citation">Entire citation</option>
            <option value="citation-entire">Citation entire</option>
            <option value="fragment-citation">Fragment citation</option>
            <option value="citation-fragment">Citation fragment</option>
        </select>
      </div>
    </div>
  );
}