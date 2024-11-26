import { FC, InputHTMLAttributes } from "react";
import { FormInputLabel, Input, Group } from "./form.styles";

type formEntries = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormEntry: FC<formEntries> = ({ label, ...otherEntries }) => {
  return (
    <Group>
      <Input {...otherEntries} />
      {label && (
        <FormInputLabel
          shrink={Boolean(
            otherEntries.value &&
              typeof otherEntries.value === "string" &&
              otherEntries.value.length
          )}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormEntry;
