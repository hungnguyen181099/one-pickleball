export const extractLatLngStringFromGoogleMapEmbed = (iframeOrUrl?: string | null) => {
  if (!iframeOrUrl) return null;

  const srcMatch = iframeOrUrl.match(/src="([^"]+)"/) || iframeOrUrl.match(/src=\\"([^"]+)\\"/);

  const url = srcMatch ? srcMatch[1] : iframeOrUrl;

  const match = url.match(/!2d(-?\d+\.?\d*)!3d(-?\d+\.?\d*)/);
  if (!match) return null;

  const [, lng, lat] = match;

  return { lat, lng };
};
