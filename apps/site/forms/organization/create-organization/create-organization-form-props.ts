import { CreateOrganizationInput } from "@tacotacIO/codegen";

import { sdk } from "@/lib/sdk";
import { Field, GenericFormProps } from "@/components/form/types";

export const getCreateOrganizationFormProps: (input: {}) => GenericFormProps<CreateOrganizationInput> = ({}) => {
  const fields: Field<CreateOrganizationInput>[] = [
    {
      name: "name",
      label: "Nom de l'organisation",
      type: "text",
      required: true,
      placeholder: "Obole",
    },
  ];
  console.log("fields", fields);
  const onSubmit = async (data: CreateOrganizationInput) => {
    console.log("created", data);
    return await sdk().CreateOrganization({ input: data });
  };
  return {
    fields,
    action: "create",
    onSubmit,
  };
};
