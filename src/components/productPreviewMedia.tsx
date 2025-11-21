export default function ProductPreviewMedia({
  url,
  alt = "Product Image",
}: {
  url: string;
  alt?: string;
}) {
  if (!url) return null;

  return (
    <div className="flex items-center justify-center w-full h-full overflow-hidden">
      <img
        src={url}
        alt={alt}
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
}
