import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";

import "../../../css/userPage.css";
import { memberType } from "../../../lib/enums/member.enum";

export default function UserPage() {
  const { authMember } = useGlobals();
  const history = useHistory();
  if (!authMember) history.push("/");
  return (
    <div className={"member-page"}>
      <Container>
        <Stack className={"member-page-frame"}>
          <Stack className={"member-main-panel"}>
            <Box>
              <Box className={"member-panel-title"}>Profile Editorial</Box>
              <Box className={"member-panel-subtitle"}>
                Update your details, portrait, and style notes in one place.
              </Box>
              <Box className={"member-settings-wrap"}>
                <Settings />
              </Box>
            </Box>
          </Stack>

          <Stack className={"member-side-panel"}>
            <Box className={"member-profile-card"}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <div className={"member-avatar-wrap"}>
                  <img
                    src={
                      authMember?.memberImage
                        ? `${serverApi}/${authMember.memberImage}`
                        : "/icons/default-user.svg"
                    }
                    className={"member-avatar"}
                    alt="Member profile"
                  />
                  <div className={"member-type-chip"}>
                  <img src={authMember?.memberType === memberType.STORE ?  

                           "/icons/restaurant.svg"
                          : "/icons/user-badge.svg"
                      }
                      alt="member type icon"
                    />
                  </div>
                </div>
                <span className={"member-name"}>
                  {authMember?.memberNick}
                </span>
                <span className={"member-meta"}>
                  {authMember?.memberType}
                </span>
                <span className={"member-meta"}>
                  {authMember?.memberAddress
                    ? authMember.memberAddress
                    : "no address"}
                </span>
              </Box>
              <Box className={"member-social-row"}>
                <FacebookIcon />
                <InstagramIcon />
                <TelegramIcon />
                <YouTubeIcon />
              </Box>
              <p className={"member-description"}>{authMember?.memberDesc ? 
              authMember.memberDesc : "No description"}</p>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}