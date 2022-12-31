import { useEffect } from "react";

const TitleHooks = (title) => {
    useEffect(() => {
        document.title = `DevSoftBD-${title}`;
    }, [title]);
};

export default TitleHooks;