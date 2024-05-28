export const Arrow: React.FC<{ className?: string; fill?: string }> = ({
  className,
  fill,
}) => {
  return (
    <div className={className + ""}>
      <svg
        fill={fill || "#f87171"}
        data-name="Layer 1"
        viewBox="0 0 58 20"
        className="style_arrow__GU20Q"
      >
        <defs>
          <mask
            id="prefix__a"
            x="0"
            y="0"
            width="58"
            height="20"
            maskUnits="userSpaceOnUse"
          >
            <path fillRule="evenodd" fill="#fff" d="M0 0h58v20H0V0z"></path>
          </mask>
        </defs>
        <g mask="url(#prefix__a)">
          <path
            d="M49 .17a.57.57 0 00-.79 0 .58.58 0 000 .79l8 8.5H.56A.56.56 0 000 10a.55.55 0 00.56.55h55.6l-8 8.51a.57.57 0 000 .79.57.57 0 00.79 0l8.88-9.45a.59.59 0 000-.76z"
            fillRule="evenodd"
          ></path>
        </g>
      </svg>
    </div>
  );
};
