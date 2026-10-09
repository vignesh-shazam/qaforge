// Maps project names to local SVG thumbnail assets
export function getProjectThumbnail(name: string, thumbnail?: string | null): string {
  if (thumbnail) return thumbnail;
  const lower = name.toLowerCase();
  if (lower.includes("ecommerce") || lower.includes("e-commerce") || lower.includes("shop") || lower.includes("store")) return "/images/projects/project-thumb-ecommerce.svg";
  if (lower.includes("bank") || lower.includes("finance") || lower.includes("payment")) return "/images/projects/project-thumb-banking.svg";
  if (lower.includes("health") || lower.includes("medical") || lower.includes("hospital") || lower.includes("patient")) return "/images/projects/project-thumb-healthcare.svg";
  if (lower.includes("learn") || lower.includes("educat") || lower.includes("course") || lower.includes("lms")) return "/images/projects/project-thumb-learning.svg";
  if (lower.includes("travel") || lower.includes("flight") || lower.includes("hotel") || lower.includes("booking")) return "/images/projects/project-thumb-travel.svg";
  if (lower.includes("dashboard") || lower.includes("analytics") || lower.includes("internal") || lower.includes("admin")) return "/images/projects/project-thumb-dashboard.svg";
  if (lower.includes("mobile") || lower.includes("ios") || lower.includes("android") || lower.includes("app")) return "/images/projects/project-thumb-mobile.svg";
  if (lower.includes("api") || lower.includes("rest") || lower.includes("graphql") || lower.includes("backend")) return "/images/projects/project-thumb-api.svg";
  // Default cycle through thumbnails based on hash
  const thumbs = ["ecommerce","banking","healthcare","learning","travel","dashboard","mobile","api"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const idx = Math.abs(hash) % thumbs.length;
  return `/images/projects/project-thumb-${thumbs[idx]}.svg`;
}