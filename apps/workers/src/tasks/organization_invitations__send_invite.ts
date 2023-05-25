import { Task } from "graphile-worker";

import { SendEmailPayload } from "./send_email";
import { EMAIL_INVITE } from "../utils/emailTemplates";

interface OrganizationInvitationSendInvitePayload {
  /**
   * invitation id
   */
  id: string;
}

export const organizationSendInvite: Task = async (
  inPayload,
  { addJob, withPgClient }
) => {
  const payload: OrganizationInvitationSendInvitePayload = inPayload as any;
  const { id: invitationId } = payload;
  const {
    rows: [invitation],
  } = await withPgClient(pgClient =>
    pgClient.query(
      `
        select *
        from publ.organization_invitations
        where id = $1
      `,
      [invitationId]
    )
  );
  if (!invitation) {
    console.error("Invitation not found; aborting");
    return;
  }

  const {
    rows: [organization],
  } = await withPgClient(pgClient =>
    pgClient.query(`select * from publ.organizations where id = $1`, [
      invitation.organization_id,
    ])
  );

  const sendEmailPayload: SendEmailPayload = {
    mailData: {
      to: invitation.email,
      subject: `You have been invited to ${organization.name}`,
      from: {
        name: organization.name,
        email: "contact@kaypi.fr",
      },
      templateId: EMAIL_INVITE,
      dynamicTemplateData: {
        organizationName: organization.name,
        link:
          `${process.env.ROOT_URL}/invitations/accept?id=${encodeURIComponent(
            invitation.id
          )}` +
          (invitation.code
            ? `&code=${encodeURIComponent(invitation.code)}`
            : ""),
      },
    },
  };
  await addJob("sendEmail", sendEmailPayload);
};
