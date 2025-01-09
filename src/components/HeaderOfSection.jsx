const HeaderOfSection = ({
  title,
  description,
  titleSize = 36,
  DesSize = 16,
  titleColor = "var(--titleColor)",
  DesColor = "var(--DescriptionColor2)",
  titleCenter = false,
  DesCenter = false,
  titleLH = 43.2,
  DesLH = 19.84,
  titleWeight = 800,
  DesWeight = 500,
  DesMaxWidth,
  DesAlignSelfStart,
}) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h2
        className={`font-extrabold ${titleCenter ? "text-center" : ""}`}
        style={{
          fontSize: `${titleSize}px`,
          lineHeight: `${titleLH}px`,
          color: titleColor,
          fontWeight: titleWeight,
          alignSelf: DesAlignSelfStart ? "flex-start" : "auto",
        }}
      >
        {title}
      </h2>
      <p
        className={`font-medium ${DesCenter ? "text-center" : ""}`}
        style={{
          fontSize: `${DesSize}px`,
          lineHeight: `${DesLH}px`,
          color: DesColor,
          fontWeight: DesWeight,
          maxWidth: DesMaxWidth ? `${DesMaxWidth}px` : "none",
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default HeaderOfSection;
