import { CreateOrganizationInput } from "@tacotacIO/codegen";

import { sdk } from "@/lib/sdk";
import { Field, GenericFormProps } from "@/components/form/types";

export const getCreateOrganizationFormProps: (input: {}) => GenericFormProps<CreateOrganizationInput> = ({}) => {
  const fields: Field<CreateOrganizationInput>[] = [
    {
      name: "name",
      label: "Nom de l'équipe",
      type: "text",
      required: true,
      placeholder: "Obole",
    },
  ];
  const onSubmit = async (data: CreateOrganizationInput) => {
    return await sdk().CreateOrganization({ input: data });
  };
  return {
    fields,
    action: "create",
    onSubmit,
  };
};
