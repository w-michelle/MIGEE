/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, Stack, Text } from "@sanity/ui";
import { PatchEvent, set, useFormValue } from "sanity";

type ShopifyOption = {
  _key: string;
  _type: "productOption";
  name: string;
  values: string[];
  position: number;
};

export default function OptionSelector(props: any) {
  const { value, onChange } = props;

  const options = (useFormValue(["options"]) as ShopifyOption[]) || [];

  const dynamicOptions = [];

  options.forEach((opt) => {
    if (!opt || !Array.isArray(opt.values)) return;

    opt.values.forEach((v) => {
      dynamicOptions.push({
        title: `${v}`,
        value: `${opt.name}:${v}`,
      });
    });
  });
  dynamicOptions.unshift({ title: "All", value: "" });

  return (
    <Stack space={3}>
      <Select
        value={value || ""}
        onChange={(e) => onChange(PatchEvent.from(set(e.target.value)))}
      >
        {dynamicOptions.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
          >
            {opt.title}
          </option>
        ))}
      </Select>
    </Stack>
  );
}

//   const parsed = options.map((opt) => {
//     return {
//       title: opt?.name,
//       values: opt?.values?.join(", "),
//       value: `${opt?.name}:${opt?.values?.join(",")}`,
//     };
//   });
