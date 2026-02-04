/* eslint-disable @typescript-eslint/no-explicit-any */
import DividerPhoto from "./modules/dividerPhoto";
import Hero from "./modules/hero";
import MarqueeModule from "./modules/marqueeModule";

function RenderModule({ module }: { module: any }) {
  switch (module._type) {
    case "hero":
      return <Hero data={module} />;
    case "dividerPhoto":
      return <DividerPhoto data={module} />;

    case "marquee":
      return <MarqueeModule data={module} />;
  }
}

export default RenderModule;
