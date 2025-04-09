import React from "react";

interface DelimiterProps {
    char?: string;
}

export default function Delimiter({char = "·"}: DelimiterProps): React.ReactElement {
    return <span>&nbsp;{char}&nbsp;</span>;
}
