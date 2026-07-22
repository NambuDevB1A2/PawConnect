import { ENV } from "@/constants/env";
import { ImgHTMLAttributes, useState } from "react";

interface AppImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
    src?: string | null;
    fallbackSrc?: string;
    disabledDomain?: boolean;
    alt?: string;
}

export default function AppImage({
    src,
    fallbackSrc = "/images/placeholder.png",
    disabledDomain = false,
    alt,
    ...props
}: AppImageProps) {
    const [hasError, setHasError] = useState(false);
    const resolvedSrc = 
        !src || hasError ? fallbackSrc : 
        (!disabledDomain ? `${ENV.API_URL}/${src}` : src);

    return (
        <img
            src={resolvedSrc}
            alt={alt}
            onError={() => setHasError(true)}
            {...props}
        />
    );
}