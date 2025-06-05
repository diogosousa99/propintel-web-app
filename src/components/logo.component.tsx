type LogoProps = {
    width?: number | string;
    height?: number | string;
};

export function Logo({ width = 262, height = 236 }: LogoProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 262 236" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="70.5098" y="58.6348" width="77.932" height="76.4476" rx="38.2238" fill="#E27A39" />
            <rect x="226.374" y="72.7366" width="35.6261" height="34.8839" rx="17.4419" fill="#E27A39" />
            <rect y="120.238" width="35.6261" height="34.8839" rx="17.4419" fill="#E27A39" />
            <rect x="61.6035" y="195.201" width="35.6261" height="34.8839" rx="17.4419" fill="#E27A39" />
            <rect x="150.668" y="200.397" width="35.6261" height="34.8839" rx="17.4419" fill="#E27A39" />
            <rect x="116.527" width="35.6261" height="34.8839" rx="17.4419" fill="#E27A39" />
            <rect
                x="124.189"
                y="132.503"
                width="4.45326"
                height="78.9598"
                transform="rotate(-26 124.189 132.503)"
                fill="#E27A39"
            />
            <rect
                x="127.202"
                y="32.5476"
                width="4.45326"
                height="29.3301"
                transform="rotate(17 127.202 32.5476)"
                fill="#E27A39"
            />
            <rect
                x="147.74"
                y="97.9001"
                width="4.45326"
                height="78.9598"
                transform="rotate(-93 147.74 97.9001)"
                fill="#E27A39"
            />
            <rect
                x="73.4238"
                y="110.734"
                width="4.45326"
                height="44.0548"
                transform="rotate(66 73.4238 110.734)"
                fill="#E27A39"
            />
            <rect
                x="97.144"
                y="132.983"
                width="4.45326"
                height="65.1359"
                transform="rotate(14 97.144 132.983)"
                fill="#E27A39"
            />
        </svg>
    );
}
