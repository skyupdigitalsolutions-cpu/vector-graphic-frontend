import { usePageContext } from "vike-react/usePageContext";

export default function Head() {
  const { config } = usePageContext();

  return (
    <>
      {config?.metaDescription && (
        <meta name="description" content={config.metaDescription} />
      )}
      {config?.keywords && (
        <meta name="keywords" content={config.keywords} />
      )}

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
      />

      <meta name="robots" content="index, follow" />
    </>
  );
}