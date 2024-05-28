export const Logo: React.FC<{ className?: string; fill?: string }> = ({
  className,
  fill,
}) => {
  return (
    <svg
      className={className + ""}
      fill={fill || "black"}
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 460.23 105.29"
    >
      <defs>
        <radialGradient
          id="radial-gradient"
          cx="278.94"
          cy="339.92"
          r="104.49"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" />
          <stop offset="1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        className="cls-1"
        d="M635.31 279.44v3.69a36.26 36.26 0 100 62.29v3.47h15.74v-69.45zm-18.56 54.41a19.58 19.58 0 1119.58-19.58 19.57 19.57 0 01-19.58 19.58z"
        transform="translate(-190.82 -245.24)"
      />
      <path className="cls-1" d="M163.92 0h16.16v103.56h-16.16z" />
      <path
        d="M227.07 333.85a19.57 19.57 0 01-19.57-19.58h-16.68a36.26 36.26 0 1072.51 0h-16.68a19.57 19.57 0 01-19.58 19.58z"
        transform="translate(-190.82 -245.24)"
        fill="url(#radial-gradient)"
      />
      <path
        className="cls-1"
        d="M227.07 278a36.25 36.25 0 00-36.25 36.25h16.68a19.58 19.58 0 0139.15 0h16.68A36.25 36.25 0 00227.07 278z"
        transform="translate(-190.82 -245.24)"
      />
      <path
        d="M227.07 294.7a19.57 19.57 0 00-19.57 19.57h39.15a19.57 19.57 0 00-19.58-19.57z"
        transform="translate(-190.82 -245.24)"
        fill="none"
      />
      <path
        className="cls-1"
        d="M227.07 333.85a19.57 19.57 0 0019.58-19.58H207.5a19.57 19.57 0 0019.57 19.58zM406.8 338.6a31.34 31.34 0 0024.77 11.73 31.68 31.68 0 0017.86-5.73v4.31h16.16v-69.45h-16.16v46.74c-2.53 2.88-8.71 8.68-17.43 8.68a15.65 15.65 0 01-11.92-5.36c-1.74-2-3.52-5.13-3.52-12.49v-37.57H400.4v35.43c0 11.11 1.91 18.11 6.4 23.71zM551.39 289.66a31.37 31.37 0 00-24.77-11.73 31.74 31.74 0 00-17.87 5.73v-4.31H492.6v69.45h16.16v-46.74c2.53-2.88 8.7-8.68 17.43-8.68a15.63 15.63 0 0111.91 5.36c1.75 2.05 3.52 5.13 3.52 12.49v37.57h16.17v-35.43c0-11.06-1.92-18.15-6.4-23.71zM321.93 277.93a31.73 31.73 0 00-17.86 5.73v-4.31h-16.15v69.45h16.16v-46.74c2.53-2.88 8.7-8.68 17.43-8.68a16.06 16.06 0 017.44 1.84v-16.54a33.25 33.25 0 00-7.02-.75z"
        transform="translate(-190.82 -245.24)"
      />
    </svg>
  );
};
