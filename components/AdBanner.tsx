"use client";

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
}

export function AdBanner({ adKey, width, height, className }: AdBannerProps) {
  const srcDoc = `<!DOCTYPE html><html><head><style>body{margin:0;padding:0;overflow:hidden;}</style></head><body>
<script>
  atOptions = {
    'key' : '${adKey}',
    'format' : 'iframe',
    'height' : ${height},
    'width' : ${width},
    'params' : {}
  };
</script>
<script src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>
</body></html>`;

  return (
    <iframe
      srcDoc={srcDoc}
      width={width}
      height={height}
      style={{ border: "none", overflow: "hidden" }}
      scrolling="no"
      title="Advertisement"
      className={className}
    />
  );
}
