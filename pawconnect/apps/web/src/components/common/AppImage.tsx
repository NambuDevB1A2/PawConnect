'use client';

import { ENV } from "@/constants/env";
import Image from "next/image";
import { ImgHTMLAttributes, useEffect, useState } from "react";

interface AppImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
    src?: string | null;
    fallbackSrc?: string;
    disabledDomain?: boolean;
    width?: number,
    height?: number,
    fill?: boolean;
    alt?: string;
}

function resolveSrc(src: string, disabledDomain: boolean) {
    if (disabledDomain || /^https?:\/\//.test(src) || /^http?:\/\//.test(src)) {
        return src;
    }

    return `${ENV.AZURE_STORAGE_DOMAIN}/${ENV.AZURE_PUBLIC_CONTAINER}/${src}`;
}

export default function AppImage({
    src,
    fallbackSrc = "/images/placeholder.png",
    disabledDomain = false,
    width = 400,
    height = 400,
    fill = false,
    alt,
    ...props
}: AppImageProps) {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(false);
    }, [src]);

    const resolvedSrc = !src || hasError ? fallbackSrc : resolveSrc(src, disabledDomain);

    if (fill) {
        return (
            <Image
                src={resolvedSrc}
                fill
                loading="lazy"
                alt={alt ? alt : ""}
                onError={() => setHasError(true)}
                {...props}
            />
        );
    }

    return (
        <Image
            src={resolvedSrc}
            width={width}
            height={height}
            loading="lazy"
            alt={alt ? alt : ""}
            onError={() => setHasError(true)}
            {...props}
        />
    );
}