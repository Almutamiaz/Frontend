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
  responsiveFontSizes = false,
  extraClass = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 items-center ${extraClass}`}>
      <h2
        className={`line-clamp-2 font-extrabold ${
          titleCenter ? "text-center" : ""
        } ${responsiveFontSizes ? "max-[430px]:!text-[24px]" : ""} pb-1`}
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
        className={`font-medium ${DesCenter ? "text-center" : "self-start"} ${
          responsiveFontSizes ? "max-[430px]:!text-[16px]" : ""
        } line-clamp-2`}
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
