export interface CompatChipsProps {
  platform: string;
}

export default function CompatChips({ platform }: CompatChipsProps) {
  return (
    <div className="compat">
      <span className="chip">Works with {platform}</span>
      <span className="chip">Plug & play</span>
      <span className="chip">Tested & cleaned</span>
    </div>
  );
}
