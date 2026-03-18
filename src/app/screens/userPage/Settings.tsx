import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { useGlobals } from "../../hooks/useGlobals";
import { useEffect, useState } from "react";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/memberService";
import {
  getPaymentProfile,
  PaymentMethodId,
  PaymentProfile,
  savePaymentProfile,
} from "../../../lib/paymentProfile";

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const memberKey = authMember?._id ? String(authMember._id) : "guest";
  const [image, setImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-user.svg"
  );
  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>({
    memberNick: authMember?.memberNick,
    memberPhone: authMember?.memberPhone,
    memberAddress: authMember?.memberAddress,
    memberDesc: authMember?.memberDesc,
    memberImage: authMember?.memberImage,
  });
  const [paymentInput, setPaymentInput] = useState<PaymentProfile>(() =>
    getPaymentProfile(memberKey)
  );
  const [isCardEditMode, setIsCardEditMode] = useState(false);
  const [activeSettingsSection, setActiveSettingsSection] = useState<"profile" | "card">(
    "profile"
  );

  useEffect(() => {
    setPaymentInput(getPaymentProfile(memberKey));
  }, [memberKey]);

  const memberNickHandler = (e: T) => {
    setMemberUpdateInput({ ...memberUpdateInput, memberNick: e.target.value });
  };

  const memberPhoneHandler = (e: T) => {
    setMemberUpdateInput({ ...memberUpdateInput, memberPhone: e.target.value });
  };

  const memberDescHandler = (e: T) => {
    setMemberUpdateInput({ ...memberUpdateInput, memberDesc: e.target.value });
  };

  const memberAddressHandler = (e: T) => {
    setMemberUpdateInput({ ...memberUpdateInput, memberAddress: e.target.value });
  };

  const handleUpdateSubmit = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberPhone === "" ||
        memberUpdateInput.memberDesc === ""
      ) {
        throw new Error(Messages.error3);
      }
      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);

      await sweetTopSmallSuccessAlert("Modified successfully", 7000);
    } catch (err) {
      console.log("handleUpdateSubmit", err);
      sweetErrorHandling(err).then();
    }
  };

  const handlePaymentMethod = (e: T) => {
    setPaymentInput({
      ...paymentInput,
      preferredMethod: e.target.value as PaymentMethodId,
    });
  };

  const handleCardHolder = (e: T) => {
    setPaymentInput({ ...paymentInput, cardHolder: e.target.value });
  };

  const handleCardNumber = (e: T) => {
    const digits = String(e.target.value || "")
      .replace(/\D/g, "")
      .slice(0, 16);
    const formatted = digits.replace(/(.{4})/g, "$1 ").trim();
    setPaymentInput({ ...paymentInput, cardNumber: formatted });
  };

  const handleCardExpiry = (e: T) => {
    const digits = String(e.target.value || "")
      .replace(/\D/g, "")
      .slice(0, 4);
    const formatted =
      digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
    setPaymentInput({ ...paymentInput, expiry: formatted });
  };

  const handleCardCvv = (e: T) => {
    const digits = String(e.target.value || "")
      .replace(/\D/g, "")
      .slice(0, 4);
    setPaymentInput({ ...paymentInput, cvv: digits });
  };

  const handleCardDetailsSave = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        !paymentInput.cardHolder ||
        !paymentInput.cardNumber ||
        !paymentInput.expiry ||
        !paymentInput.cvv
      ) {
        throw new Error("Please fill all card detail inputs");
      }
      savePaymentProfile(memberKey, paymentInput);
      setIsCardEditMode(false);
      await sweetTopSmallSuccessAlert("Card details updated", 3500);
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  const handleImageViewer = (e: T) => {
    const file = e.target.files[0];
    const fileType = file.type,
      validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validateImageTypes.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else if (file) {
      setMemberUpdateInput({ ...memberUpdateInput, memberImage: file });
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Box className={"member-settings"}>
      <div className={"member-settings-switch"}>
        <button
          type="button"
          className={`member-switch-btn ${activeSettingsSection === "profile" ? "active" : ""}`}
          onClick={() => {
            setActiveSettingsSection("profile");
            setIsCardEditMode(false);
          }}
        >
          User Data
        </button>
        <button
          type="button"
          className={`member-switch-btn ${activeSettingsSection === "card" ? "active" : ""}`}
          onClick={() => setActiveSettingsSection("card")}
        >
          Card Details
        </button>
      </div>

      {activeSettingsSection === "profile" ? (
        <>
          <Box className={"member-media-frame"}>
            <img src={image} className={"member-image-preview"} alt="profile" />
            <div className={"member-media-change"}>
              <span>Upload image</span>
              <p>JPG, JPEG, PNG formats only!</p>
              <div className={"member-upload-box"}>
                <Button component="label" onChange={handleImageViewer}>
                  <CloudDownloadIcon />
                  <input type="file" hidden />
                </Button>
              </div>
            </div>
          </Box>

          <Box className={"member-input-frame"}>
            <div className={"member-input-long"}>
              <label className={"member-label"}>Username</label>
              <input
                className={"member-input member-nick"}
                type="text"
                placeholder={authMember?.memberNick}
                value={memberUpdateInput.memberNick}
                name="memberNick"
                onChange={memberNickHandler}
              />
            </div>
          </Box>

          <Box className={"member-input-frame"}>
            <div className={"member-input-short"}>
              <label className={"member-label"}>Phone</label>
              <input
                className={"member-input member-phone"}
                type="text"
                placeholder={authMember?.memberPhone || "no phone"}
                value={memberUpdateInput.memberPhone}
                name="memberPhone"
                onChange={memberPhoneHandler}
              />
            </div>
            <div className={"member-input-short"}>
              <label className={"member-label"}>Address</label>
              <input
                className={"member-input member-address"}
                type="text"
                placeholder={authMember?.memberAddress || "no address"}
                value={memberUpdateInput.memberAddress}
                name="memberAddress"
                onChange={memberAddressHandler}
              />
            </div>
          </Box>

          <Box className={"member-input-frame"}>
            <div className={"member-input-long"}>
              <label className={"member-label"}>Description</label>
              <textarea
                className={"member-textarea member-description"}
                placeholder={authMember?.memberDesc || "no description"}
                value={memberUpdateInput.memberDesc}
                name="memberDesc"
                onChange={memberDescHandler}
              />
            </div>
          </Box>

          <Box className={"member-save-box"}>
            <Button variant={"contained"} onClick={handleUpdateSubmit}>
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Box className={"member-card-section"}>
          <div className={"member-card-header"}>
            <h4>Card Details</h4>
            <Button
              className={"member-card-edit-btn"}
              onClick={() => setIsCardEditMode((prev) => !prev)}
            >
              {isCardEditMode ? "Cancel Edit" : "Edit"}
            </Button>
          </div>

          <Box className={"member-input-frame"}>
            <div className={"member-input-short"}>
              <label className={"member-label"}>Preferred Method</label>
              <select
                className={"member-select"}
                value={paymentInput.preferredMethod}
                onChange={handlePaymentMethod}
                disabled={!isCardEditMode}
              >
                <option value="visa">Visa</option>
                <option value="mastercard">MasterCard</option>
                <option value="paypal">PayPal</option>
                <option value="western">Western</option>
              </select>
            </div>
            <div className={"member-input-short"}>
              <label className={"member-label"}>Card Holder</label>
              <input
                className={"member-input"}
                value={paymentInput.cardHolder}
                onChange={handleCardHolder}
                disabled={!isCardEditMode}
                placeholder={"Card holder name"}
              />
            </div>
          </Box>

          <Box className={"member-input-frame"}>
            <div className={"member-input-long"}>
              <label className={"member-label"}>Card Number</label>
              <input
                className={"member-input"}
                value={paymentInput.cardNumber}
                onChange={handleCardNumber}
                disabled={!isCardEditMode}
                placeholder={"1234 5678 9012 3456"}
              />
            </div>
          </Box>

          <Box className={"member-input-frame"}>
            <div className={"member-input-short"}>
              <label className={"member-label"}>Expiry</label>
              <input
                className={"member-input"}
                value={paymentInput.expiry}
                onChange={handleCardExpiry}
                disabled={!isCardEditMode}
                placeholder={"MM / YY"}
              />
            </div>
            <div className={"member-input-short"}>
              <label className={"member-label"}>CVV</label>
              <input
                className={"member-input"}
                value={paymentInput.cvv}
                onChange={handleCardCvv}
                disabled={!isCardEditMode}
                placeholder={"***"}
                type={"password"}
              />
            </div>
          </Box>

          {isCardEditMode && (
            <div className={"member-card-save-row"}>
              <Button className={"member-card-save-btn"} onClick={handleCardDetailsSave}>
                Save Card Details
              </Button>
            </div>
          )}
        </Box>
      )}
    </Box>
  );
}
