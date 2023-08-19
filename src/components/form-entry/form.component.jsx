import { FormInputLabel, Input, Group } from "../form-entry/form.styles.jsx";

const FormEntry = ({ label, ...otherEntries }) => {
  return (
    <Group>
      <Input {...otherEntries} />
      {label && (
        <FormInputLabel shrink={otherEntries.length}>{label}</FormInputLabel>
      )}
    </Group>
  );
};

export default FormEntry;
