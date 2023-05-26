import { GetCurrentUserQuery, UpdateUserInput } from "@/../../@tacotacIO/codegen/dist";

import { sdk } from "@/lib/sdk";
import { Field, GenericFormProps } from "@/components/form/types";

export const getUpdateUserFormProps: (input: {
  data: GetCurrentUserQuery["currentUser"];
}) => GenericFormProps<UpdateUserInput> = ({ data }) => {
  const fields: Field<UpdateUserInput>[] = [
    {
      name: "id",
      type: "text",
      hidden: true,
      label: "Id",
      initialValue: data.id,
    },
    {
      label: "Prénom",
      name: "patch.firstname",
      type: "text",
      minLength: 2,
      required: true,
      defaultValue: data.firstname,
    },
    {
      label: "Nom de famille",
      name: "patch.lastname",
      type: "text",
      minLength: 2,
      required: true,
      defaultValue: data.lastname,
    },
    {
      label: "Avatar",
      name: "patch.avatarUrl",
      placeholder: "Glissez votre image ici",
      type: "file",
      defaultValue: data.avatarUrl,
    },
  ];
  const onSubmit = async (data: UpdateUserInput) => {
    console.log("updated", data);
    await sdk().UpdateUser({ input: data });
  };
  return {
    fields,
    action: "update",
    onSubmit,
  };
};
