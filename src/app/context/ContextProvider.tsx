import React, { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { GlobalContext } from "../hooks/useGlobals";
import { Member } from "../../lib/types/member";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const cookies = new Cookies();

    if (!cookies.get("accessToken")) {
        localStorage.removeItem("memberData");
    }

    const normalizeMember = (member: any): Member | null => {
        if (!member) return null;
        return {
            ...member,
            memberAddress: member.memberAddress ?? member.memberAdress ?? "",
            memberDesc: member.memberDesc ?? member.memberDescription ?? "",
        } as Member;
    };

    const [authMember, setAuthMember] = useState<Member | null>(() => {
        const raw = localStorage.getItem("memberData");
        if (!raw) return null;
        const parsed = normalizeMember(JSON.parse(raw));
        localStorage.setItem("memberData", JSON.stringify(parsed));
        return parsed;
    });

    const [ orderBuilder, setOrderBuilder ] = useState<Date>(new Date());
    console.log("== verify ==", authMember);

    return (
        <GlobalContext.Provider value={{ authMember, setAuthMember, orderBuilder, setOrderBuilder }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default ContextProvider;
