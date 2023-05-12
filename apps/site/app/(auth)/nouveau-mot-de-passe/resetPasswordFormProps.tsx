import { ResetPasswordInput } from "@/../../@tacotacIO/codegen/dist";

import { sdk } from "@/lib/sdk";
import { Field, GenericFormProps } from "@/components/form/types";

export const getResetPasswordFormProps: ({
  token,
  userId,
}: {
  token: string;
  userId: string;
}) => GenericFormProps<ResetPasswordInput> = ({ token, userId }) => {
  const fields: Field<ResetPasswordInput>[] = [
    {
      name: "newPassword",
      type: "text",
      label: "Nouveau mot de passe",
      initialValue: "",
    },
    {
      name: "resetToken",
      type: "text",
      label: "token",
      initialValue: token,
      hidden: true,
    },

    {
      name: "userId",
      type: "text",
      label: "userId",
      initialValue: userId,
      hidden: true,
    },
  ];
  const onSubmit = async (data: ResetPasswordInput) => {
    console.log("created", data);
    await sdk().ResetPassword({
      input: {
        ...data,
      },
    });
  };
  return {
    fields,
    action: "create",
    onSubmit,
  };
};
