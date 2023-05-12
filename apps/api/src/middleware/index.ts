import installDatabasePools from "./installDatabasePools";
import installErrorHandler from "./installErrorHandler";
import installForceSSL from "./installForceSSL";
import { installCors } from "./installCors";
import installLogging from "./installLogging";
import { installGoogleOAuth } from "./installGoogleOAuth";
import installPostGraphile from "./installPostGraphile";
import installSharedStatic from "./installSharedStatic";
import installWorkerUtils from "./installWorkerUtils";
import { installJWTRefresh } from "./installJWTRefresh";
import { installAuthorizationHeader } from "./installAuthorizationHeader";

export {
  installDatabasePools,
  installErrorHandler,
  installForceSSL,
  installGoogleOAuth,
  installLogging,
  installPostGraphile,
  installSharedStatic,
  installJWTRefresh,
  installWorkerUtils,
  installCors,
  installAuthorizationHeader,
};
