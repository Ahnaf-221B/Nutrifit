"use client";

const IconTrack = (props: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={props.className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default IconTrack;